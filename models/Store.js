const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    last: String,
    email: String,
    password:String
})

module.exports = mongoose.model('Store', schema);