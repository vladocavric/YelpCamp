const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');

app.use(express.static('themes'));
app.use(bodyParser.urlencoded({extend: true}));
app.set('view engine', 'ejs');

let pizzeria = [
    {name: 'Panter', img: 'https://panterns.com/wp-content/uploads/2017/02/cropped-logo-1-1.png'},
    {name: 'BigPizza', img: 'https://bigpizza.rs/images/logo.png'},
    {name: 'laTorcia', img: 'https://cafferestoranlatorcia.com/images/logo.png'},
    {name: 'Ciao', img: 'http://pizzeriaciao.rs/media/1118/pizzeria_ciao_logo.svg'},
    {name: 'San Francisco', img: 'http://www.sfpizza.rs/images/sf-logo-200-transparent.png'}
];

pizzeria.reverse();

app.get('/', function (req, res) {
    res.render('Home')
});

app.get('/pizzeria', function (req, res) {

    res.render('pizzeria', {pizzeria: pizzeria})
});

app.post('/pizzeria', function (req, res) {
    const name = req.body.pizzeria;
    const img = req.body.url;
    let newPizzeria = {name: name, img: img};
    pizzeria.unshift(newPizzeria);
    // res.send('you are on post rout')
    res.redirect('pizzeria')
});

app.get('/pizzeria/new', function (req, res) {
    res.render('newpizzeria')
});

app.get('*', function (req, res) {
    res.send('404');
});


app.listen(8012);
