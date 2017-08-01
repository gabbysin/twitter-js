const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

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
  res.render('index', {tweets:list });
});

// router.post(''. function(){})

module.exports = router;