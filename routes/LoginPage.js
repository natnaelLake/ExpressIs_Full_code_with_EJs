const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const passport = require('passport')
const notAuth = require('./notAuth')
const roleAuth = require('./Role')
const Register = require('../models/RegUser')



module.exports= router.post('/',notAuth,async (req, res, next) => {
    try {
        
        Register.findOne({email:req.body.email},(err,result)=>{
            if(err) throw err;
            console.log(typeof(result));
            roleAuth(result);

        });
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/mainLogin',
            badRequestMessage:'Please fill the field',
            failureFlash:true
        })(req,res,next);
        
    } catch(e) {
        console.log(e)
    }
})
router.get('/', notAuth,(req, res) => {
    res.render('LogPage')
})

