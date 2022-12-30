const { throws } = require('assert');
const express = require('express');
const mongoose = require('mongoose');
const { title } = require('process');
const router = express.Router();
const Images = require('../../models/Image');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var id;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage});
router.post('/:id',upload.single('image'), async (req, res)=>{
    id=req.params.id
    const {title,desc} = req.body;
    const items = {
        img: {
            data: fs.readFileSync(path.join(__dirname + '../../../public/images/' + req.file.filename )),
            contentType: req.file.mimetype        }
}

Images.updateOne({_id:req.params.id}, {$set:{title:title,desc:desc,img:items.img}},(err)=>
   { if (err) {
        console.log(err);
    }
    Images.find({}, (err,name) => {
        res.render('admin/jobs', {
            imageData: name
        });
    })  
})
    
}

);

router.get('/:id',(req,res)=>{
    // id = req.params;
    console.log(id);
    Images.findById(req.params.id,(err,data)=>{
        if(err) throw err;
        res.render('admin/updateCard',{data:data})
        
    })

})

module.exports = router;