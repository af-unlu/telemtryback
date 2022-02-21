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
app.get('/', (req, res) => res.send('home'));
app.get('/secret', requireAuth, (req, res) =>{
    if(res.statusCode ==200){
        res.json({ "message":"You are authorized" });
    }
    else{
        res.json({ "message":"You are not authorized" });
    }
});
app.use(authRoutes);
app.get('*', checkUser,(req,res)=>{
    res.status(404).json({"message":"This end point doesnt exist"});
});