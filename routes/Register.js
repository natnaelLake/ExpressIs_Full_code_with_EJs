const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Register = require('../models/RegUser')
const canInt = require('./notAuth')


router.get('/', canInt,(req, res) => {
    res.render('Register')
})
router.post('/', canInt,async (req, res) => {
    const errors = [];
    
    const { name, last, password,email, phone, age } = req.body;
   
    if (!name ) {
        errors.push({msg:"Please fill the First Name"})
    }
    if (!last ) {
        errors.push({msg:"Please fill the Last Name"})
    }
    if (!email ) {
        errors.push({msg:"Please fill the email"})
    }
    if (!password ) {
        errors.push({msg:"Please fill the password"})
    }
    if (!phone ) {
        errors.push({msg:"Please fill the Phone Number"})
    }
    if (password.length < 6) {
        errors.push({msg:"Length of the password must be above 6 characters"})
    }
    if (errors.length > 0) {
        res.render('Register', {
            errors,
            name,
            email,
            password,
            last,
            phone
        })
    }
    else {
        
        Register.findOne({ email: email }).then(value => {
            if (value) {
                errors.push({msg:"User is already registered"})
                res.render('Register', {
                    errors,
                    name,
                    email,
                    password,
                    last,
                    phone
                })
            }
            else {
                const user = new Register({
                    name,
                    last,
                    email,
                    password,
                    phone,
                    age
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash

                        user.save().then((value)=>
                        {
                            req.flash('success_msg', 'You are now registered and can log in')
                            res.redirect('/mainLogin')
                        }
                        )
                    })
                })
                
                
            }
        })
        
    }

});
module.exports = router;