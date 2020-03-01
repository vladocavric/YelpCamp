var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    rating: { type: Number, min: 1, max: 5 },
    author: String
});

module.exports = mongoose.model("comment", commentSchema);