const express = require('express');
const router = express.Router();
const Image = require('../../models/Image');
const fs = require('fs');
const { check, validationResult } = require('express-validator')
const multer = require('multer')
const path = require('path');

// var entries = [];
// router.locals.entries = entries;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
});

// const imageFileFilter = (req, res, cb) => {
// //     if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)&/)) {
// //         return cb(new Error( 'You can upload only image files!'),false)
// //     }
// //     else {
// //         cb(null, true);
// //     }
// }
const upload = multer({ storage: storage})
router.get('/', (req, res) => {
    res.render('admin/addCard')
})
router.post('/',upload.single('image'), async (req, res)=>{
        const items = {
            title: req.body.title,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '../../../public/images/' + req.file.filename )),
                contentType: req.file.mimetype        }
    }
    Image.create(items, (err, items) => {
        if (err) {
            console.log(err);
        }
    })   
       res.redirect('/jobs')
   }
  
);

module.exports = router;