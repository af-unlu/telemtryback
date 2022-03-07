//#region Init
require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const embRoutes = require('./routes/embRoutes');
const dummyRoutes = require('./routes/dummyRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
var cors = require("cors");
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.DB_BASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(process.env.PORTX || process.env.PORT);
    console.log("App Has Started");
})
.catch((err) => console.log(err));

//#endregion


app.use(authRoutes);
app.use(dummyRoutes);
app.use(embRoutes);


//#region 404
app.get('*', checkUser,(req,res)=>{
    res.status(404).json({"message":"Not Found"});
});
app.post('*' ,checkUser,(req,res)=>{
    res.status(404).json({"message":"Not Found"});
});
//#endregion