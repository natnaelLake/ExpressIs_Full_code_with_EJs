const express = require('express');
const router = express.Router();
const Store = require('../../models/Store');
const {check,validationResult} = require('express-validator')
// const db = require('../app')
// var entries = [];
// router.locals.entries = entries;

router.post('/', async (req, res)=>{

        const store = new Store({
            name: req.body.name,
            last: req.body.lname,
            email: req.body.email,
            status:req.body.status
        })
        const data = await store.save();
        Store.find({}, (err,name) => {
            res.render('users/dataPage', {
                userList: name
            });
        }) 
    
});
router.get('/', (req, res) => {
    // console.log(req.hostname)
    Store.find({}, (err,name) => {
        res.render('users/dataPage', {
            userList: name
        });
    })  
})
module.exports = router;