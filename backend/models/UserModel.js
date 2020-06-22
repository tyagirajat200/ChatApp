var mongoose = require('mongoose')
var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        lowercase:true,
        unique:1
    },
    password: {
        type:String,
        minlength:8,
        required:true,
    },
    image:{
        type:String,
    },
    date: {
        type:Date,
        default:Date.now
    }
})

var User = new mongoose.model('User', schema)

module.exports= User