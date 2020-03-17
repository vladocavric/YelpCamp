const express = require('express');
const router = express.Router({mergeParams: true});
const pizzeria = require('../models/pizzeria');
const User = require('../models/user');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
//=================================================================
router.use(methodOverride('_method'));
router.use(expressSanitizer());
//================================================================

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
//===============================================================

// new route
router.get('/new', isLoggedIn, function (req, res) {
    res.render('pizzerias/new')
});
//=================================================================

// create route
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
    res.redirect('/pizzeria')
});
//============================================================

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
//===============================================================================================

// edit route
router.get('/:id/edit', isPizzeriaOwner, function (req, res) {
    pizzeria.findById(req.params.id, function (err, pizza) {
        res.render('pizzerias/edit', {pizza: pizza})
    });
});
//===============================================================================================

// update route
router.put('/:id', isPizzeriaOwner, function (req, res) {
    // TODO: define what needs to be sanitized (body was for blog's)
    // req.body.pizzeria.body = req.sanitize(req.body.pizzeria.body);
    pizzeria.findByIdAndUpdate(req.params.id, req.body.pizzeria, function (err, pizzeria) {
        res.redirect('/pizzeria/' + req.params.id);
    })
});
//===============================================================================================

// destroy route
router.delete('/:id', isPizzeriaOwner, function (req, res) {
    pizzeria.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/pizzeria');
    })
});

//===============================================================================================

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/log-in')
}

function isPizzeriaOwner(req, res, next) {
    if (req.isAuthenticated()) {
        pizzeria.findById(req.params.id, function (err, pizzeria) {
            if (err) {
                res.redirect('back');
            } else {
                if (pizzeria.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('/log-in');
    }
}

module.exports = router;
