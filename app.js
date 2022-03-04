//#region Init
require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const embRoutes = require('./routes/embRoutes');
const dummyRoutes = require('./routes/dummyRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.DB_BASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(process.env.PORT);
    console.log("http://localhost:" +process.env.PORT);
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
//#endregion