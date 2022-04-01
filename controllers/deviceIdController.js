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
        Device.findOne({"_id":req.params.deviceId},(err, doc) => {
            if (err) {
                res.status(400).json({
                    "Message": "Error"
                });
            }
            else{
                res.status(200).json(doc);
            }
        });
    })
}


//Req Body'de istenenler 
module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        const {name,props} = req.body;
        const deviceId = req.params.deviceId;
        Device.updateOne({"_id":deviceId},
        { "$set": { name:name,props:props}},
        (err, doc) => {
            if (err) {
                res.status(400).json({
                    "Message": "Error"
                });
            }
            else{
                res.status(200).json(doc);
            }
        })
    })
}

module.exports.delete = async (req, res) => {
    taskToDo(req,res,()=>{
        const deviceId = req.params.deviceId;
       Device.find({"_id":deviceId},
       (err, doc) => {
        if (err) {
            res.status(400).json({
                "Message": "Error"
            });
        }
        else{
            if(doc){
                res.status(404).json({
                    "Message": "404 Not Exist"
                });
            }else{
                doc.remove((err)=>{
                    if(err){
                        res.status(400).json({
                            "Message": "Error"
                        });
                    }
                    else{
                        res.status(200).json({
                            "Message": "Deleted",
                            "DeviceId":deviceId
                        });
                    }
                })
            }
        }
    })
    })
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(405).json({"Message":"Not Allowed"});
    })
}