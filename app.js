//#region Init
require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.DB_BASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(process.env.PORT);
    console.log("Has Startted");
})
.catch((err) => console.log(err));

//#endregion

//bu daha moduler
app.use(authRoutes);

//http://localhost:portno/test
app.get('/test', (req, res) => res.send("Hello Guys"));