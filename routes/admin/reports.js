const express = require('express');
const router = express.Router();
const canInt = require('../notAuth')




router.get('/', canInt,(req, res) => {
    res.render('admin/report');    
})

module.exports = router;