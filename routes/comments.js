const express = require('express');
const router = express.Router({mergeParams: true});
const pizzeria = require('../models/pizzeria');
const comment = require('../models/comment');
const User = require('../models/user');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
//=======================================================================
router.use(methodOverride('_method'));
router.use(expressSanitizer());
//=======================================================================

// new route
router.get('/new', isLoggedIn, function (req, res) {
    pizzeria.findById(req.params.id, function (err, pizzeria) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', {pizzeria: pizzeria});
        }
    })
});
//=======================================================================

// create route
router.post('/', isLoggedIn, function (req, res) {
    // let user = req.user;
    // let newComment = {text: req.body.comment.text, author: req.user.username, rating: req.body.comment.rating};
    // lookup for pizzeria
    pizzeria.findById(req.params.id, function (err, pizzeria,) {
        if (err) {
            console.log(err);
        } else {
            // console.log(pizzeria.name)
            comment.create(req.body.comment, function (err, comment) {
                // User.findOne({username: req.user.username}, function (err, user) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(comment);
                    console.log(req.user);
                    pizzeria.comments.push(comment);
                    pizzeria.save();
                    comment.pizzeria = req.params.id;
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;

                    // user.comments.push(comment);
                    comment.save();
                    console.log(comment)
                    res.redirect('/pizzeria/' + req.params.id)
                }
                // })

            })
        }
    });
});
//=================================================================

// edit route
router.get('/:id/edit', isLoggedIn, function (req, res) {
    // console.log(req.body.comment);
    comment.findById(req.params.id, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundPizza)
            res.render('comments/edit', {pizzeria: pizzeria, comment: comment})
        }
    })
});
//=================================================================

// update route
//todo: body needs to be defind, redirect should be fixed
router.put('/:id', function (req, res) {
    req.body.comment.body = req.sanitize(req.body.comment.body);
    comment.findByIdAndUpdate(req.params.id, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/pizzeria/' + comment.pizzeria);
        }
    })
});
//=================================================================

// destroy route
router.delete('/:id', function (req, res) {
    comment.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('back');
        }
    })
});
//=================================================================

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/log-in')
}

module.exports = router;