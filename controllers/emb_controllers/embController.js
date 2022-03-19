//#region depends
const User = require("../../models/User");
const Device = require("../../models/Device");
const EmbDevice = require("../../models/Embedded/EmbDevice");
const EmbCanMessage = require("../../models/Embedded/EmbCanMessage");
const EmbUart =require("../../models/Embedded/EmbUart");
//const EmbData = require("../../models/Embedded/EmbData");

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
//GET
module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        EmbDevice.find({"userId":req.params.userId},(err,found)=>{
            if(err){
                res.status(400).json({"Message":"Error"});
            }
            if(found){
                res.status(200).json(found);
            }else{
                res.status(404).json({"Message":"Doesnt Exist"});
            }
        });
    });
}
//PUT
module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(201).json({"Page":"Put","userId":req.params.userId });
    });
}
module.exports.patch = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(201).json({"Page":"Put","userId":req.params.userId });
    });
}
//DELETE
module.exports.delete = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(200).json({"Page":"Delete","userId":req.params.userId });
    });
}
//POST
module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{

        const {name,surname,email,password} = req.body;

        const uartObject = new EmbUart({

        });
        const embDev = new EmbDevice({

        });
        embDev.save();
        const device = new Device({

        });
        device.save();

        User.updateOne(
            { "_id": req.params.userId }, 
            { "$push": { devices: device } },
            (err)=>{
                if(err){
                    res.status(400).json({"Message":"Error"})
                }else{
                    res.status(201).json({"Message":"Item Added"})
                }
            }
        );
    });
}