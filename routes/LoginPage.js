const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const passport = require('passport')
const notAuth = require('./notAuth')




module.exports= router.post('/',notAuth,async (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/can',
            failureRedirect: '/mainLogin',
            badRequestMessage:'Please fill the field',
            failureFlash:true
        })(req,res,next)
    } catch(e) {
        console.log(e)
    }
})
router.get('/', notAuth,(req, res) => {
    res.render('LogPage')
})

