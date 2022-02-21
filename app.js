//#region Init
require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

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

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.send('home'));
app.get('/smoothies', requireAuth, (req, res) => res.send('smoothies'));
app.use(authRoutes);