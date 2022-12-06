const express = require('express');
const router = express.Router();
const Store = require('../models/Store');
const {check,validationResult} = require('express-validator')
const db = require('../app')
// var entries = [];
// router.locals.entries = entries;
const loginValidate = [
    check('email', 'username Must be an email.').isEmail().trim().escape().normalizeEmail(),
    check('password').isLength({min:8}).withMessage('Password Must be at least 8 character')
]
router.post('/',loginValidate, async (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send("There is an error")
    }
    else {
        const store = new Store({
            name: req.body.name,
            last: req.body.lname,
            email: req.body.email,
            password: req.body.password
        })
        const data = await store.save();
        res.render('index', {
            user: data
        })
        
    }
    
});

module.exports = router;