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
if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}
//#endregion

mongoose.connect(process.env.DB_BASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(process.env.PORTX || process.env.PORT);
    console.log("App Has Started");
})
.catch((err) => console.log(err));


app.use("/api",require('./routes/mainRouter'));

app.use(function(req, res, next) {
    res.status(404).json({ error: 'Not found' });
});