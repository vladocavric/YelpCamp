const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const request = require('request');
// const rp = require('request-promise');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const passportLocalMongoose = require('passport-local-mongoose');
const pizzeria = require('./models/pizzeria');
const comment = require('./models/comment');
const User = require('./models/user');
const expressSession = require('express-session');
const expressSanitizer = require('express-sanitizer');
const seedDB = require('./seeds');

//============
//  routes
//===========

const commentRoutes = require('./routes/comments');
const pizzeriaRoutes = require('./routes/pizzerias');
const indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/pizzerias', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});



// seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('themes'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(flash());

app.use(expressSession({
    secret: 'koji sam ja meni kralj',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.warning = req.flash('warning');
    res.locals.info = req.flash('info');
    next();
});

app.use(indexRoutes);
app.use('/pizzeria', pizzeriaRoutes);
app.use('/pizzeria/:id/comments', commentRoutes);

app.get('*', function (req, res) {
    res.send('404');
});

app.listen(5015);