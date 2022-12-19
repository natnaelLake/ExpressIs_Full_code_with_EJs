const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passPortLocalMongoose = require('passport-local-mongoose');


const Login = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    admin: {
        type: Boolean,
        default:false
    }
})
User.plugin(passPortLocalMongoose);
var login = mongoose.model('Login', Login);
module.exports = login;