const express = require('express');
const router = express.Router({mergeParams: true});
const pizzeria = require('../models/pizzeria');
const User = require('../models/user');

// index route
router.get('/', function (req, res) {
    pizzeria.find({}, function (err, pizzerias) {
        if (err) {
            console.log(err);
        } else {
            res.render('pizzerias/index', {pizzerias: pizzerias})
        }
    })
    // res.send('nesto');
});

router.post('/', isLoggedIn, function (req, res) {
    let newPizzeria = {
        name: req.body.pizzeria.name,
        img: req.body.pizzeria.img,
        site: req.body.pizzeria.site,
        map: req.body.pizzeria.map,
        price: req.body.pizzeria.price,
        description: req.body.pizzeria.description,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    };
            pizzeria.create(newPizzeria, function (err, pizzeria) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(pizzeria);
                    pizzeria.author.id = req.user.id;
                    pizzeria.author.username = req.user.username;
                }
            });


    res.redirect('/')
});

// new route
router.get('/new', isLoggedIn, function (req, res) {
    res.render('pizzerias/new')
});

// show route
router.get('/:id', function (req, res) {
    pizzeria.findById(req.params.id).populate('comments').exec(function (err, foundPizza) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundPizza)
            res.render('pizzerias/show', {pizza: foundPizza})
        }
    })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/log-in')
}

module.exports = router;
