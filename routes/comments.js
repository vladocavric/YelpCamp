const express = require('express');
const router = express.Router({mergeParams: true});
const pizzeria = require('../models/pizzeria');
const comment = require('../models/comment');
const User = require('../models/user');

router.get('/new', isLoggedIn, function (req, res) {
    pizzeria.findById(req.params.id, function (err, pizzeria) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', {pizzeria: pizzeria});
        }
    })
});

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
                        comment.author.id = req.user.id;
                        comment.author.username = req.user.username;

                        // user.comments.push(comment);
                        comment.save();
                        res.redirect('/pizzeria/' + req.params.id)
                    }
                // })

            })
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/log-in')
}

module.exports = router;