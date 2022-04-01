//#region Init
require('dotenv').config()
const express = require("express");
const helmet = require('helmet');
//const logger = require('morgan');
var errorhandler = require('errorhandler')
const mongoose = require('mongoose');
const { checkUser} = require('./middleware/authMiddleware');

const cookieParser = require('cookie-parser');
var cors = require("cors");
const User = require('./models/User');

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


app.use("/api",require('./routes/mainRouter'));

app.use("/delete=:userId",(req,res)=>{
    User.findOne({"_id":req.params.userId},(err,found)=>{
        if(err){
            res.status(400).json({"Message":"Bad Request"});
        }else{
            if(found){
                found.remove((err)=>{
                    if(err){
                        res.status(400).json({"Message":"Bad Request"});
                    }
                    else{
                        res.status(200).json({"Message":"User Silindi"});
                    }
                });
            }else{
                res.status(404).json({"Message":"Not Found"});
            }
        }
    })
})

<<<<<<< HEAD

app.use(function(req, res, next) {
    res.status(404);
    res.json({ error: 'Not found' });
    next();
=======
//#region 404
app.get('*', checkUser,(req,res)=>{
    res.status(404).json({"message":"The Get route you wanted to acces is not exist"});
});
app.post('*' ,checkUser,(req,res)=>{
    res.status(404).json({"message":"The Post route you wanted to acces is not exist"});
>>>>>>> parent of deffc22 (New 404 Middleware)
});
//#endregion