//#region Init

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));

mongoose.connect(process.env.DB_BASE_URL, {useNewUrlParser: true});

//#endregion


