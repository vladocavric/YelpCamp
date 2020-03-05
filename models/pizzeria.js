const mongoose = require('mongoose');

const pizzeriaSchema = new mongoose.Schema({
    name: String,
    img: String,
    site: String,
    map: String,
    price: Number,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});
// let pizzeria =

module.exports = mongoose.model('pizzeria', pizzeriaSchema);