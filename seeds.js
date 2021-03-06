const mongoose = require('mongoose');
const pizzeria = require('./models/pizzeria');
let commetn = require('./models/comment');
let data = [
    {
        name: 'Pizza Hut',
        img: 'https://i.pinimg.com/236x/96/0a/be/960abef4528685a8daffe3c4221594f2--pizza-branding-pizza-logo.jpg',
        description: 'Pizza Hut is an American restaurant chain and international franchise which was founded in 1958 in Wichita, Kansas by Dan and Frank Carney. The company is known for its Italian American cuisine menu, including pizza and pasta, as well as side dishes and desserts',
        site: 'https://www.pizzahutbd.com/',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.215512281816!2d20.461599215535923!3d44.81717397909866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70754a06c91d%3A0x661c997739bcf83e!2sRestaurant-Pizzeria%20Guli!5e0!3m2!1sen!2srs!4v1583015721061!5m2!1sen!2srs',
        price: 5.2
    },
    {
        name: 'Marco\'s Pizza',
        img: 'https://www.freelogovectors.net/wp-content/uploads/2020/02/marcos-pizza-logo-768x768.png',
        description: 'Marco\'s Pizza, operated by Marco\'s Franchising, LLC, is an American restaurant chain and interstate franchise based in Toledo, Ohio, that specializes in Italian-American cuisine. The first store was opened in Oregon, Ohio on Starr Ave. It was founded by Italian immigrant Pasquale "Pat" Giammarco in 1978',
        site: 'https://www.marcos.com/',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.215512281816!2d20.461599215535923!3d44.81717397909866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70754a06c91d%3A0x661c997739bcf83e!2sRestaurant-Pizzeria%20Guli!5e0!3m2!1sen!2srs!4v1583015721061!5m2!1sen!2srs',
        price: 6
    },
    {
        name: 'Papa John\'s Pizza',
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Papa_John%27s_Logo_2019.svg',
        description: 'Papa John\'s is an American pizza restaurant franchise. It\'s the fourth largest pizza delivery restaurant chain in the United States, with headquarters in Jeffersontown, Kentucky, a suburb of Louisville',
        site: 'https://www.papajohns.com/',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.215512281816!2d20.461599215535923!3d44.81717397909866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70754a06c91d%3A0x661c997739bcf83e!2sRestaurant-Pizzeria%20Guli!5e0!3m2!1sen!2srs!4v1583015721061!5m2!1sen!2srs',
        price: 8
    },
    {
        name: 'Little Caesars',
        img: 'https://toppng.com/public/uploads/preview/little-caesars-pizza-little-caesars-logo-11562971618nrlyfsdjjh.png',
        description: 'Little Caesar Enterprises Inc. is the third-largest pizza chain in the United States, behind Pizza Hut and Domino\'s Pizza. It operates and franchises pizza restaurants in the United States and internationally in Asia, the Middle East, Australia, Canada, Latin America and the Caribbean',
        site: 'https://littlecaesars.com/en-us/',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.215512281816!2d20.461599215535923!3d44.81717397909866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70754a06c91d%3A0x661c997739bcf83e!2sRestaurant-Pizzeria%20Guli!5e0!3m2!1sen!2srs!4v1583015721061!5m2!1sen!2srs',
        price: 12
    }
];

function seedDB() {
    //remuve all pizzerias
    commetn.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            // console.log('remuved all the commetns')
        }

    });
    pizzeria.deleteMany({}, function (err) {
        if(err){
            console.log(err);
        } else {
            // console.log('remove compgrounds');
            //add a few pizzerias
            // data.forEach(seed =>
            //     pizzeria.create(seed, function (err, pizzeria) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             // console.log('added pizzaria');
            //             commetn.create({
            //                 text: 'This place is grat, but I wish there is a pasta on menu',
            //                 rating: 4,
            //                 author: 'Homer'
            //             }, function (err, comment) {
            //                 if (err) {
            //                     console.log(err);
            //                 } else {
            //                     // console.log(comment);
            //                     pizzeria.comments.push(comment);
            //                     pizzeria.save();
            //                     // console.log('saved a comment');
            //
            //                 }
            //             })
            //         }
            //
            //     })
            // );
        }
    });
}

module.exports = seedDB;