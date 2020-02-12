const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', {
    name: String,
    age: Number,
    temperment: String

});

// var george = new Cat({
//     name: 'George',
//     age: 11,
//     temperment: 'Grouchy'
// });

// george.save(function (err, cat) {
//     if(err){
//         console.log('something went wrong')
//     } else {
//         console.log('we just save a cat');
//         console.log(cat);
//     }
// });

const kitty = new Cat({
    name: 'Siva',
    age: 5,
    temperment: 'nervozna'
});
kitty.save().then(() => console.log('meow'));