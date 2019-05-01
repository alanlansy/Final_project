var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports=mongoose.model('User',new Schema({
    fname:{
            type:String,
            required:true
    },
    lname:{
            type:String,
            required:true
    },
    uname:{
            type:String,
            required:true
    },
    email:{
            type:String,
            required:true
    },
    password:{
            type:String,
            required:true
    }
}));
