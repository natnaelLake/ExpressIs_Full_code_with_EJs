const express = require("express");
const Login = require('../models/user')
const bodyParser = require('body-parser')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Done')
})

router.get('/signup', (req, res, next) => {
    Login.findOne({ username: req.body.username })
        .then((user) => {
            if (user != null) {
                var err = new Error('User ' + req.body.username + ' is already exist');
                err.status = 403;
                next(err);
            }
            else {
                return Login.create(
                    {
                        username: req.body.username,
                        password: req.body.password
                    })
            }
        }).then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: 'Registration successful', user: user },
            (err) => { next(err) })
        })
        .catch(() => { })
})

router.post('/login', (req, res, next) => {
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
          const err = new Error('You are not authenticated!');
          res.setHeader('www-Authenticate', 'Basic')
          err.status = 401;
          return next(err);
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
        Login.findOne({ username: username }).then((user) => {
            if (user === null) {
                const err = new Error('ser' + username + ' does nto exist');
                res.setHeader('www-Authenticate', 'Basic')
                err.status = 403;
                return next(err);   
            }
            else if (user.password !== password) {
                const err = new Error('Your password is incorrect');
                res.setHeader('www-Authenticate', 'Basic')
                err.status = 401;
                return next(err);
            }
            else if (user.username === username && user.password === password) {
                req.session.user = 'authenticated';
                res.statusCode = 200;
                res.setHeader('Content-Type','text/plain')
              }
              else {
                const err = new Error('You are not authenticated!');
                res.setHeader('www-Authenticate', 'Basic')
                err.status = 401;
                return next(err);
              }
        })
        
      }
})
router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else
    {
        const err = new Error('you are not logged in ');
        err.status = 403;
        next(err);
    }
})
module.exports = router;
