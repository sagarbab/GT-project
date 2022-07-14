const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const port = process.env.PORT;
var cors = require('cors');

const connection = require('./connection');
const userRoute = require('./routes/user');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.json());
app.use('/user',userRoute);


module.exports = app;