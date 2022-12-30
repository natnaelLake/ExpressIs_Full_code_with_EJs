const mongoose = require('mongoose');


const login =  mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
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

module.exports = mongoose.model('Login',login)