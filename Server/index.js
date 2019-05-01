var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');  //configration for the db 
var user = require('./app/models/user');  //get user model
var auth = require('./auth/auth.js');
var path = require('path');
cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    app.use(morgan('dev'));   //log to console
app.disable('x-powered-by') //jsut remove x-powerd 
mongoose.connect(config.database, { useNewUrlParser: true });  //connect to db



app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');







app.get('/', (req, res) => {
    app.use(express.static(__dirname + '/public'));
    res.render('index.ejs');
    
});

app.get('/login', function (req, res) {
    app.use(express.static(__dirname + '/public'));
    res.render('login.ejs')
   
});


app.get('/dashboard', function (req, res) {
    app.use(express.static(__dirname + '/public'));
    res.render('analysis.ejs')
})

app.get('/prediction', function (req, res) {
    app.use(express.static(__dirname + '/public'));
    res.render('prediction.ejs')
})

app.get('/register', function (req, res) {
    app.use(express.static(__dirname + '/public'));
    res.render('register.ejs');
    

});


//post requests
app.post('/createUser', function (req, res) {
    console.log(req.body.lname)
    auth.create(req, res);
});

app.post('/auth', function (req, res) {
   auth.authenticate(req, res,function(user){
    if(user.uname!=undefined){
        res.json({'success':true,'fname':user.fname,'lname':user.lname})
    }
    else{
        res.json({'success':false})
    }
   });
  
});




var server = require('http').createServer(app);
server.listen(8080);
console.log('running at 8080');