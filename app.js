const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');
const mongoose = require('mongoose');
const pizzeria = require('./models/pizzeria');
const comment = require('./models/comment')
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost:27017/pizzerias', {useNewUrlParser: true, useUnifiedTopology: true});

seedDB();

app.use(express.static('themes'));
app.use(bodyParser.urlencoded({extend: true}));
app.set('view engine', 'ejs');

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

app.post('/pizzeria', function (req, res) {
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

app.get('/pizzeria/new', function (req, res) {
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

app.get('/pizzeria/:id/comments/new', function (req, res) {
    pizzeria.findById(req.params.id, function (err, pizzeria) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', {pizzeria: pizzeria});
        }
    })
});

app.post('/pizzeria/:id/comments', function (req, res) {
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
    // create new comment
    //connect new comment to pizzaria

});

app.get('*', function (req, res) {
    res.send('404');
});


app.listen(8015);