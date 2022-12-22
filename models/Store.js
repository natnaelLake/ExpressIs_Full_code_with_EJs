const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    last: String,
    email: String,
    status: {
        type: String,
        default:"UnAccepted"
    }
})
module.exports = mongoose.model('Store', schema);