//#region Init
require('dotenv').config()
const express = require("express");
const helmet = require('helmet');
//const logger = require('morgan');
var errorhandler = require('errorhandler')
const mongoose = require('mongoose');
const { checkUser} = require('./middleware/authMiddleware');
const ApiRoutes = require('./routes/mainRouter');

const cookieParser = require('cookie-parser');
var cors = require("cors");

const app = express();

//Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//app.use(logger);
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler())
}


mongoose.connect(process.env.DB_BASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(process.env.PORTX || process.env.PORT);
    console.log("App Has Started");
})
.catch((err) => console.log(err));

//#endregion


app.use("/api",ApiRoutes);



//#region 404
app.get('*', checkUser,(req,res)=>{
    res.status(404).json({"message":"The Get route you wanted to acces is not exist"});
});
app.post('*' ,checkUser,(req,res)=>{
    res.status(404).json({"message":"The Post route you wanted to acces is not exist"});
});
//#endregion