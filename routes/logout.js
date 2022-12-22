const express = require('express');
const router = express.Router();

router.delete('/', (req, res,next) => {
    req.logOut(function (err) {
        if (err) throw next(err)
        
        res.redirect('/mainLogin')
    });
})

module.exports = router;
