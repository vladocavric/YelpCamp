const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session');
const pizzeria = require('./models/pizzeria');
const comment = require('./models/comment')
const User = require('./models/user');
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost:27017/pizzerias', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(expressSession({
    secret: 'koji sam ja meni kralj',
    resave: false,
    saveUninitialized: false
}));

seedDB();

app.use(express.static('themes'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===================
// ROUTHS
//====================


app.get('/', function (req, res) {
    res.render('Home')
});

app.get('/pizzeria', function (req, res) {
    pizzeria.find({}, function (err, pizzerias) {
        if (err) {
            console.log(err);
        } else {
            res.render('pizzerias/index', {pizzerias: pizzerias})
        }
    })
    // res.send('nesto');
});

app.post('/pizzeria', isLoggedIn, function (req, res) {
    // const name = req.body.pizzeria;
    // const img = req.body.url;
    // const description = req.body.description;
    pizzeria.create(req.body.pizzeria, function (err, pizzeria) {
        if (err) {
            console.log(err);
        } else {
            // console.log(pizzeria);
        }
    });
    res.redirect('pizzeria')
});

app.get('/pizzeria/new', isLoggedIn, function (req, res) {
    res.render('pizzerias/new')
});

app.get('/pizzeria/:id', function (req, res) {
    pizzeria.findById(req.params.id).populate('comments').exec(function (err, foundPizza) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundPizza)
            res.render('pizzerias/show', {pizza: foundPizza})
        }
    })
});

// COMMENTS

app.get('/pizzeria/:id/comments/new', isLoggedIn, function (req, res) {
    pizzeria.findById(req.params.id, function (err, pizzeria) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', {pizzeria: pizzeria});
        }
    })
});

app.post('/pizzeria/:id/comments', isLoggedIn, function (req, res) {
    // lookup for pizzeria
    pizzeria.findById(req.params.id, function (err, pizzeria) {
        if (err) {
            console.log(err);
        } else {
            // console.log(pizzeria.name)
            comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(comment)
                    pizzeria.comments.push(comment);
                    pizzeria.save()
                    res.redirect('/pizzeria/' + req.params.id)
                }
            })
        }
    });
 });

//=================
// AUTH ROUTES
//=================

app.get('/sign-up', function (req, res) {
    res.render('signup')
});

app.post('/sign-up', function (req, res) {
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

app.get('/log-in', function (req, res) {
    res.render('login')
});

app.post('/log-in', passport.authenticate('local', {
    successRedirect: '/pizzeria/new',
    failureRedirect: '/log-in'
}), function (req, res) {
    // res.send('login post routh')
});

app.get('/log-out', function (req, res) {
    // res.send('ok, i will log you out. not yet though...')
    req.logout();
    res.redirect('/')
});
//======================================

app.get('*', function (req, res) {
    res.send('404');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/log-in')
}


app.listen(5015);