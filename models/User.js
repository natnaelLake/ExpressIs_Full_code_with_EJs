const mongoose = require('mongoose');

const login =  mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true
    },
    phoneNumber:{
        type:Number,
        default:0934627708
    }
})

module.exports = mongoose.model('User',login)