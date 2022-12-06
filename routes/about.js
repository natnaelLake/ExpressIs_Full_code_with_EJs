const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(req.hostname)
    res.render('about');    
})

module.exports = router;