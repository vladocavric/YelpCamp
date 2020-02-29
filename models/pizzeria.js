const mongoose = require('mongoose');

const pizzeriaSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});
// let pizzeria =

module.exports = mongoose.model('pizzeria', pizzeriaSchema);