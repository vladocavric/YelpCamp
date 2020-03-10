const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session');
const User = require('../models/user');


//root route (home)
router.get('/', function (req, res) {
    res.render('Home')
});

// register route
router.get('/sign-up', function (req, res) {
    res.render('signup')
});

router.post('/sign-up', function (req, res) {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('signup');
        } else {
            // res.redirect('/');
            passport.authenticate('local')(req, res, function () {
                res.redirect('/pizzeria')
            })
        }
    });
});

// authentication route
router.get('/log-in', function (req, res) {
    res.render('login')
});

router.post('/log-in', passport.authenticate('local', {
    successRedirect: '/pizzeria/new',
    failureRedirect: '/log-in'
}), function (req, res) {
    // res.send('login post routh')
});

router.get('/log-out', function (req, res) {
    // res.send('ok, i will log you out. not yet though...')
    req.logout();
    res.redirect('/')
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/log-in')
}

module.exports = router;