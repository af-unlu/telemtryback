const User = require("../models/User");
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

/*
checkUser => Logged User 
URL Params : UserId
Logged UserID and UserID  must match 
*/
//#region route('/user=:userId')

//GET return all of ui pages of the user
module.exports.get_all = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(200).json({"Page":"Get","userId":req.params.userId });
    })
}
//POST add one ui page created from request body if valid
module.exports.create_one = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(201).json({"Page":"Post","userId":req.params.userId });
    })
}
//PUT replaces all of ui's with request body if valid
module.exports.update_all = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(201).json({"Page":"Put","userId":req.params.userId });
    })
}
//DELETE deletes all of 
module.exports.delete_all = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(200).json({"Page":"Delete","userId":req.params.userId });
    })
}

//#endregion


/*
checkUser => Logged User 
URL Params : UserId , uiId
Logged UserID and UserID  must match 
*/
//#region route('/user=:userId/ui=:uiId')

//GET return one of ui pages of the user
module.exports.get_one = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(200).json({"Page":"Get","userId":req.params.userId });
    })
}
//PUT replaces one of ui with request body if valid
module.exports.update_one = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(201).json({"Page":"Put","userId":req.params.userId });
    })
}
//DELETE deletes one
module.exports.delete_one = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(200).json({"Page":"Delete","userId":req.params.userId });
    })
}

//#endregion