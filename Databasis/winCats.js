const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/winCat', {useNewUrlParser: true, useUnifiedTopology: true});

// const Cat = mongoose.model('Cat', { name: String });
//
// const kitty = new Cat({ name: 'Ljudmila' });
// kitty.save().then(() => console.log('meow'));

const User = mongoose.model('User', {
    name: String,
    age: Number,
    partner: String
});

// const aUser = new User({
//     name: 'Nikolina',
//     age: 22,
//     partner: "Aleksanar"
// });
// aUser.save(function (err, aUser) {
//     if (err) {
//         console.log('something went wrong')
//     } else {
//         console.log('jao'),
//             console.log('----------------------------------------------'),
//             console.log(aUser),
//             console.log('-----------------------------------------------')
//     }
// });
User.deleteOne({partner: "Aleksanar"}, function (err, user) {
    if (err) {
        console.log('od sranja se ne bezi');
        console.log(err)
    } else {
        console.log('obrisani korisnik');
        console.log(user);
        console.log('********************************************')
    }
});

User.find({}, function (err, users) {
    if (err) {
        console.log('od sranja se ne bezi');
        console.log(err)
    } else {
        console.log('svi korisnice');
        console.log(users);
        console.log('---------------------------------')
    }

});