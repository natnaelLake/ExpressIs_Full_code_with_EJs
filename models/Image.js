const mongoose = require('mongoose');

const schema = mongoose.Schema({
    desc: String,
    title:String,
    img:
    {
        data: Buffer,
        contentType: String,
    }
})

module.exports = mongoose.model('Image', schema);

