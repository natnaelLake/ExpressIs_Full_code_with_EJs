const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/report');    
})

module.exports = router;