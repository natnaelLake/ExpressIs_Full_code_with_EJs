const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Register = require('../models/RegUser')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            if (!email || !password) {
                return done(null, false, { message: 'Please fill the filled' });
            }
            Register.findOne({ email: email }).then(value => {
                if (!value) {
                    return done(null, false, { message: "That email is not registered." })
                }
                bcrypt.compare(password, value.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, value)
                    }
                    else {
                            
                        return done(null, false, { message: "Password is incorrect" })
                        
                    }
                })
            }).catch(e => { console.log(e) });
        })
    ); 
    passport.serializeUser((value,done) => {
        done(null,value.id)
    })
    passport.deserializeUser((id, done) => [
        Register.findById(id, (err, value) => {
            done(err, value);
        })
    ])
}