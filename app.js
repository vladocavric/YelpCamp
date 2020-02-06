const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');

app.use(express.static('themes'));
app.use(bodyParser.urlencoded({extend: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('Home')
})

app.get('/camphrounds', function(req, res){
    res.render('Camphrounds')
})

app.get('*', function(req, res){
    res.send('404');
})


app.listen(8012);