const express = require('express');
const router = express.Router();
const db = require('../../app')
const Store = require('../../models/Store');


router.get('/', (req, res) => {
    // console.log(req.hostname)
    Store.find({}, (err,name) => {
        res.render('admin/candidate', {
            userList: name
        });
    })  
})

module.exports = router;