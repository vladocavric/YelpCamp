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

// const kitty = new Cat({
//     name: 'narandzasta',
//     age: 7,
//     temperment: 'mirna'
// });
// kitty.save().then(() => console.log(kitty));

Cat.create({
    name: 'ljubicasta',
    age: 6,
    temperment: 'mila'
}, function (err, cat) {
    if(err){
        console.log(err);
    }else {
        console.log(cat);
        console.log('-----------------------------------------------------------------------------------')
    }

});

Cat.find({}, function (err, cats) {
    if(err){
        console.log('oh no error');
        console.log(err);
    } else {
        console.log('all the cats');
        console.log(cats);
        console.log('------------------------------------------------------------------------------------')
    }
})