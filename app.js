const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const cassandra = require('cassandra-driver');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

//app.use(methodOverride('_method'));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const authRoutes = require();


app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.listen(3000);





