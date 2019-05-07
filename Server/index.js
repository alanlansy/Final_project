var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');  //configration for the db 
var user = require('./app/models/user');  //get user model
var auth = require('./auth/auth.js');
var graph = require('./analysis/graph.js');
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

app.get('/topcrimes',function(req,res){
    graph.topCrimes(req,res)
})
app.get('/friend',function(req,res){
    graph.friend(req,res)
})


app.get('/between',function(req,res){
    graph.between(req,res)
})

app.get('/topspots',function(req,res){
    graph.topSpots(req,res)
})

app.get('/visualization',function(req,res){
    app.use(express.static(__dirname + '/public'));
   res.render('visualization.ejs')
})

app.get('/trianglecount',function(req,res){
    graph.triangleCount(req,res)
})
app.get('/showtriangle',function(req,res){
    app.use(express.static(__dirname + '/public'));
    res.render('trianglecount.ejs')
})
app.get('/connections',function(req,res){
    app.use(express.static(__dirname + '/public'));
    res.render('connections.ejs')
})
app.get('/showbetween',function(req,res){
    app.use(express.static(__dirname + '/public'));
    res.render('beetween.ejs')
})

app.get('/showfriend',function(req,res){
    app.use(express.static(__dirname + '/public'));
    res.render('friend.ejs')
})
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

app.post('/crimenear',function(req,res){
    graph.crimeNear(req,res)
})





var server = require('http').createServer(app);
server.listen(8080);
console.log('running at 8080');