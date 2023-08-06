const dotenv = require('dotenv');
const mongoose = require('mongoose');
var express = require('express');
const cookieParser = require('cookie-parser');
var app = express();
dotenv.config({path:'./Config.env'});
require('../db/conn');


// Use middleware to store cookies
app.use(cookieParser());

// Read data in JSON format
app.use(express.json());

// All routes are defined in this file
app.use(require('../router/auth'));


const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server on the listening port ${port}`);
})