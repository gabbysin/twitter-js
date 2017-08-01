const express = require( 'express' );
const nunjucks = require('nunjucks');
const app = express(); // creates an instance of an express application

app.set('view engine', 'html');
app.engine('html', nunjucks.render); 
nunjucks.configure('views', {
    noCache: true,
    express: app,
});

app.listen(3000, function() {
    console.log("server listening");
})

app.use(function (req, res, next) {
    console.log(`${req.method} ${req.url}`);
    // console.log(`${req.method} ${req.url} ${res.status}`);
    next();
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
})

app.use('/special/*', function(req, res, next) {
    console.log("You did it!!");
    next();
})

var locals = {
    title: 'Twitter Wkshp',
    people: [
        {name:'Gandalf'},
        {name:'Frodo'},
        {name:'Hermione'}
    ]
};

app.get('/', function(req, res) {
    res.render("index.html",locals);
});

var locals = {
    title: 'Twitter Wkshp',
    people: [
        {name:'Gandalf'},
        {name:'Frodo'},
        {name:'Hermione'}
    ]
};



