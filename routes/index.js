var express = require('express');
var router = express.Router();
const checkAuth = require('./authentication')
const notAuth = require('./notAuth')

/* GET home page. */
router.get('/',checkAuth, function(req, res, next) {
  res.render('login');
});

module.exports = router;
