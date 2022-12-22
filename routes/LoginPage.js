const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const passport = require('passport')

router.post('/', async (req, res,next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/can',
            failureRedirect: '/mainLogin',
            failureFlash:true
        })(req,res,next)
    } catch(e) {
        console.log(e)
    }
})
router.get('/', (req, res) => {
    res.render('LogPage')
})
module.exports = router;