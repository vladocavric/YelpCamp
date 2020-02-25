const mongoose = require('mongoose');
const pizzeriaSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
});
// let pizzeria =

module.exports = mongoose.model('pizzeria', pizzeriaSchema);