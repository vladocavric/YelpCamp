const express = require('express');
const router = express.Router({mergeParams: true});
const pizzeria = require('../models/pizzeria');
const comment = require('../models/comment');
const User = require('../models/user');
// const methodOverride = require('method-override');
// const expressSanitizer = require('express-sanitizer');
//=======================================================================
// router.use(methodOverride('_method'));
// router.use(expressSanitizer());
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
                    res.redirect('/pizzeria/' + req.params.id)
                }
                // })

            })
        }
    });
});
//=================================================================

// edit route
router.get('/:comment_id/edit', isCommentOwner, function (req, res) {
    // console.log(req.body.comment);
    comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            // console.log(foundPizza)
            res.render('comments/edit', {pizzeria: pizzeria, comment: comment});
            //     console.log(comment.author.id);
            //     console.log('=========================================')
            //     console.log(req.user.id);
        }
    })
});
//=================================================================

// update route
//todo: body needs to be defind, redirect should be fixed
router.put('/:comment_id', isCommentOwner, function (req, res) {
    // req.body.comment.body = req.sanitize(req.body.comment.body);
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            res.redirect('/pizzeria/' + req.params.id);
        }
    })
});
//=================================================================

// destroy route
router.delete('/:comment_id', isCommentOwner, function (req, res) {
    comment.findByIdAndDelete(req.params.comment_id, function (err) {
        if (err) {
            console.log(err);
            res.redirect('back');
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

function isCommentOwner(req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                res.redirect('back');
            } else {
                if (comment.author.id.equals(req.user._id)) {
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