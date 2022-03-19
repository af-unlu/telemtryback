//#region depends
const User = require("../../models/User");
const generateApiKey = require('generate-api-key');

require('dotenv').config();

const taskToDo= (req,res,task)=>{
    if(res.locals.myStatus === 200){
        if(res.locals.user._id.toString() == req.params.userId){
            task();
        }
        else
        {
            res.status(403).json({"message":"403 Forbidden"});
        }
    }
    else{
        res.status(401).json({"message":"401 Unauthorized"});
    }
}  
//#endregion

/*
checkUser => Logged User 
URL Params : UserId
Logged UserID and UserID  must match 
*/
//GET return all of ui pages of the user
module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(200).json({"Page":"Get","userId":req.params.userId });
    })
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(201).json({"Page":"Post","userId":req.params.userId });
    })
}
