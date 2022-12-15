const express = require('express');
const router = express.Router();
const Image = require('../../models/Image');
const fs = require('fs');
const { check, validationResult } = require('express-validator')
const multer = require('multer')
var path = require('path');

// var entries = [];
// router.locals.entries = entries;


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    }
});
var upload = multer({ storage: storage })
router.post('/',upload.single('image'), async (req, res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    const items = {
        title: req.body.title,
        desc: req.body.desc,
        img: {
            data: new Buffer.from(encode_image,'base64'),
            contentType: req.file.mimetype        }
    }
    Image.create(items, (err, items) => {
        if (err) {
            console.log(err);
        }
    })   
    res.redirect('/jobs')
}
);

module.exports = router;