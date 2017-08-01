const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');


module.exports = function (io) {
  router.use(express.static('public'));
  router.use(bodyparser.urlencoded({extended:false}));
  router.use(bodyparser.json()); 

  router.get('/', function (req, res) {
      var tweets = tweetBank.list();
    res.render( 'index', { tweets:tweets, showForm:true } );
  });

  router.get( '/users/:name', function (req, res) {
    var name = req.params.name;
    var list = tweetBank.find(function(o){
      return o.name.includes(name);
    });
    res.render('index', {tweets:list, showForm:true, name:name});
  });

  router.get( '/tweets/:id', function (req, res) {
    var id = req.params.id;
    
    var list = tweetBank.find(function(o){
      return o.id === parseInt(id);
    });
    var name = list[0].name;
    res.render('index', {tweets:list, showForm:true, name:name });
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', { text });
    res.redirect('/');
  });


  return router;
};