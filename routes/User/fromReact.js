const express = require('express')
const User = require('../../models/User')
const router = express.Router()

router.post('/',(req,res)=>{
    const {fname,lname,email,password,phoneNumber} = req.body;
    const user = new User({
        fname,
        lname,
        email,
        password,
        phoneNumber
    })
    user.save()
    User.find({},(err,data)=>{
        console.log(data)
        res.send({data})
    })
})
router.get('/',(req,res)=>{
    User.find({},(err,data)=>{
        console.log(data)
        res.send({data})
    })
})

module.exports = router
