const pizzeria = require('../models/pizzeria');
const comment = require('../models/comment');

const middlewareObject = {};

middlewareObject.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {

        // req.flash('success', 'bravo you are logged in now!');
        return next();
    }
    req.flash('error', 'You have to be logged in!');
    res.redirect('/log-in')
};

middlewareObject.isCommentOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                req.flash('error', 'Something went wrong');
                res.redirect('back');
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash('error', 'you do not have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'to eddit a comment you need to be logged in firs');
        res.redirect('/log-in');
    }
};

middlewareObject.isPizzeriaOwner = function (req, res, next){
    if (req.isAuthenticated()) {
        pizzeria.findById(req.params.id, function (err, pizzeria) {
            if (err || !pizzeria) {
                req.flash('warning', err.message);
                res.redirect('back');
            } else {
                if (pizzeria.author.id.equals(req.user._id)) {
                    next();
                    req.flash('error', 'congratulation you can edit pizzeria now');
                } else {
                    // req.flash('error', 'Oops you do not have permission to do that');
                    req.flash('error', 'You do not have permissions to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'to edit pizza node you have to be logged in firs');
        res.redirect('/log-in');
    }
};

module.exports = middlewareObject;