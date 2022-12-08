const express = require('express');
const router = express.Router();
const db = require('../../app')
const Store = require('../../models/Store');


router.get('/', (req, res) => {
    // console.log(req.hostname)
    const user = Store.find({});
        res.render('admin/candidate', {
            userList:user
        });
    })

module.exports = router;