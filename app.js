//#region Init

require('dotenv').config();
const express = require("express");
const helmet = require('helmet');
//const logger = require('morgan');
var errorhandler = require('errorhandler');
const mongoose = require('mongoose');
var cors = require("cors");
//#endregion

const app = express();

//#region MiddleWare
app.use(helmet());
app.use(express.json());
app.use(cors());
//app.use(logger);
app.use(errorhandler())

//#endregion

mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log("App Has Started");
})
.catch((err) => console.log(err));


app.use("/api",require('./routes/mainRouter'));

app.use(function(req, res, next) {
    res.status(404).json({ error: 'Not found' });
});