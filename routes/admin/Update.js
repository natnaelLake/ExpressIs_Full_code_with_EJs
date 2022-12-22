const express = require('express');
const router = express.Router();
const db = require('../../app')
const Store = require('../../models/Store');

const checkAuth= require('../authentication')



router.get('/:id', checkAuth,function (req, res) {
    Store.findByIdAndUpdate(req.params.id, {$set:{"status":"Accepted"}},(err,result) => {
        if (!err) {
            res.redirect('/can')
        } else {
            console.log(err)
        }
    })
})

module.exports = router;