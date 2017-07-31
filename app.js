const express = require( 'express' );
const app = express(); // creates an instance of an express application

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


app.get('/', function(req, res) {
    res.send("welcome back!");
}) 