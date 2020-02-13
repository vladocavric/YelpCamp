const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pizzerias', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static('themes'));
app.use(bodyParser.urlencoded({extend: true}));
app.set('view engine', 'ejs');

let pizzeria = mongoose.model('pizzeria', {
    name: String,
    img: String,
    description: String
});

// pizzeria.create({
//     name: 'Pizza Hut',
//     img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.visitgalax.com%2Fproject%2Fpizza-hut%2F&psig=AOvVaw0JccEcr5G4wVtduxpeviTe&ust=1581673896807000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiJ4cigzucCFQAAAAAdAAAAABAD'
// }, function (err, pizzeria) {
//     if(err){
//         console.log(err);
//         console.log('something went wrong');
//     } else {
//         console.log('new pizzaria')
//     }
// });

// let pizzeria = [
//     {name: 'Panter', img: 'https://panterns.com/wp-content/uploads/2017/02/cropped-logo-1-1.png'},
//     {name: 'BigPizza', img: 'https://bigpizza.rs/images/logo.png'},
//     {name: 'laTorcia', img: 'https://cafferestoranlatorcia.com/images/logo.png'},
//     {name: 'Ciao', img: 'http://pizzeriaciao.rs/media/1118/pizzeria_ciao_logo.svg'},
//     {name: 'San Francisco', img: 'http://www.sfpizza.rs/images/sf-logo-200-transparent.png'}
// ];

// pizzeria.reverse();

app.get('/', function (req, res) {
    res.render('Home')
});

app.get('/pizzeria', function (req, res) {
    pizzeria.find({}, function (err, pizzerias) {
        if(err){
            console.log('oh no error');
            console.log(err);
        } else {
            console.log('all the pizzas');
            res.render('index', {pizzerias: pizzerias})
        }
    })
});

app.post('/pizzeria', function (req, res) {
    const name = req.body.pizzeria;
    const img = req.body.url;
    const description = req.body.description;
    pizzeria.create({
        name: name,
        img: img,
        description: description
    }, function (err, pizzeria) {
        if(err){
            console.log(err);
        } else {
            console.log(pizzeria);
        }
    });
    res.redirect('pizzeria')
});

app.get('/pizzeria/new', function (req, res) {
    res.render('newpizzeria')
});

app.get('/pizzeria/:id', function (req, res) {
    let id = req.params.id;
    pizzeria.findById(id, function (err, foundPizza) {
        if(err) {
            console.log(err);
        } else {
            res.render('show', {pizza: foundPizza})
        }
    });
});

app.get('*', function (req, res) {
    res.send('404');
});


app.listen(8015);
