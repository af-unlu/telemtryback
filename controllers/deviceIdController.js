//#region depends
const generateApiKey = require('generate-api-key');
require('dotenv').config();
const User = require("../models/User");
const Device = require("../models/Device");


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

// /user=:userId/device/Id=:deviceId
module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        Device.findOne({"_id":req.params.deviceId},(err, found) => {
            if (err) {
                res.status(400).json({
                    "Message": "Error"
                });
            }
            else {
                res.status(200).json(found);
            }
        });
    })
}

module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(201).json({"Page":"Put","userId":req.params.userId });
    })
}

module.exports.delete = async (req, res) => {
    taskToDo(req,res,()=>{
        try {
            Device.DeleteDevice(req.params.deviceId,(err)=>{
                if(!err){
                    res.status(200).json({
                        "Device":req.params.deviceId,
                        "Message":"The Device has been deleted"
                    })
                }
            })
        } catch (error) {
            res.status(400).json(err.message);
        }
    })
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(405).json({"Message":"Not Allowed"});
    })
}