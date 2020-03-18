const express = require('express');
const router = express.Router({mergeParams: true});
const pizzeria = require('../models/pizzeria');
const comment = require('../models/comment');
const User = require('../models/user');
const middlewareObject = require('../middleware/index');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
// const methodOverride = require('method-override');
// const expressSanitizer = require('express-sanitizer');
//=======================================================================
// router.use(methodOverride('_method'));
// router.use(expressSanitizer());
//=======================================================================

// new route
router.get('/new', middlewareObject.isLoggedIn, function (req, res) {
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
router.post('/', middlewareObject.isLoggedIn, function (req, res) {
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

                    pizzeria.comments.push(comment);
                    pizzeria.save();
                    comment.pizzeria = req.params.id;
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;

                    // user.comments.push(comment);
                    comment.save();
                    req.flash('success', 'Bravo you added a comment');
                    res.redirect('/pizzeria/' + req.params.id)
                }
                // })

            })
        }
    });
});
//=================================================================

// edit route
router.get('/:comment_id/edit', middlewareObject.isCommentOwner, function (req, res) {
    // console.log(req.body.comment);
    comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            res.render('comments/edit', {pizzeria: pizzeria, comment: comment,});
            // console.log(foundPizza)
            req.flash('error', 'you can now edit a comment');
            //     console.log(comment.author.id);
            //     console.log('=========================================')
            //     console.log(req.user.id);
        }
    })
});
//=================================================================

// update route
//todo: body needs to be defind, redirect should be fixed
router.put('/:comment_id', middlewareObject.isCommentOwner, function (req, res) {
    // req.body.comment.body = req.sanitize(req.body.comment.body);
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            req.flash('info', 'you edited a comment');
            res.redirect('/pizzeria/' + req.params.id);
        }
    })
});
//=================================================================

// destroy route
router.delete('/:comment_id', middlewareObject.isCommentOwner, function (req, res) {
    comment.findByIdAndDelete(req.params.comment_id, function (err) {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            req.flash('warning', 'you deleted a comment');
            res.redirect('back');
        }
    })
});

//=================================================================




module.exports = router;