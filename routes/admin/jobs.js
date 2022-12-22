const express = require('express');
const router = express.Router();
const Image = require('../../models/Image')
const checkAuth = require('../authentication')


router.get('/',checkAuth,(req, res) => {
    Image.find({}, (err,name) => {
        res.render('admin/jobs', {
            imageData: name
        });
    })  
})

module.exports = router;