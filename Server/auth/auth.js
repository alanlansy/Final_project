var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('../config');  //configration for the db 
var user = require('../app/models/user');  //get user model
var jwt = require('jsonwebtoken'); // used to create and verify tokens
var crypto = require('crypto');

var salt = 'salt4hashing'; //salt to hash the password

function getHash(pass){
    var hash= crypto.pbkdf2Sync(pass,salt,  
        10, 32, `sha1`).toString(`hex`);
    return hash;
}

mongoose.connect(config.database, { useNewUrlParser: true });  //connect to db
app.set('secret', config.secret);    //set the secret variable for token genration

app.use(bodyParser.urlencoded({ extended: false }));  //get the parameters from the post
app.use(bodyParser.json());

app.use(morgan('dev'));   //log to console


module.exports={
    create : function (req, res) {
        var user1 = new user({
            lname:req.body.lname,
            fname:req.body.fname,
            uname:req.body.uname,
            email:req.body.email,
            password: getHash(req.body.password)
        });
        user1.save(function (err) {
            if (err) throw err;
            console.log('user created');
            res.json({ success: true});
        })
    },
    authenticate : function (req, res,next) {
        user.findOne({
            uname: req.body.uname
        },function (err, usr) {
            if (err) throw err;
            if (!usr) {
                res.json({
                    success: false,
                    message: 'Authentication failed user not found'
                });
            }
            else if (usr) {
                if (usr.password != getHash(req.body.password)) {
                   next({'success':'false'})
                }
                else {
                    
                    next(usr)                   
                }
            }
        })
        
    }
};