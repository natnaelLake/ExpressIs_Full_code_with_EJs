const mongoose = require('mongoose');


const register = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    age: {
        type:String
    },
    phone: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Register',register)