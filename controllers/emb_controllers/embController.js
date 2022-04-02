//#region depends
const User = require("../../models/User");
const Device = require("../../models/Device");
const EmbDevice = require("../../models/Embedded/EmbDevice");
const EmbCanMessage = require("../../models/Embedded/EmbCanMessage");
const EmbUart =require("../../models/Embedded/EmbUart");

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


//Populated Message, hope it works
module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        EmbDevice.findOne({"_id":req.params.embId})
        .populate([
            {
                path:'uart',
                model:'EmbUart'
            },
            {
                path:"can",
                populate:{
                    path: 'msgs',
                    model: 'EmbCanMessage'
                }
            }
        ])
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                if(doc){
                    res.status(200).json(doc);
                }
                else{
                    res.status(404).json({"Message":"Not Found"});
                }
            }
        })
    });
}

module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        const {log_ms} = req.body;
        const embId = req.params.embId;
        EmbDevice.updateOne({"_id":embId},
        { "$set": { log_ms:log_ms}},
        (err, doc) => {
            if (err) {
                res.status(400).json({"Message": "Error"});
            }
            else{
                res.status(200).json(doc);
            }
        })
    });
}


module.exports.delete = async (req, res) => {
    taskToDo(req,res,()=>{
        const embId = req.params.embId;
        EmbDevice.findOne({"_id":embId},(err,doc)=>{
            if(err){
                res.status(400).json({"Message": "Error"});
            }
            else{
                if(doc){
                    doc.remove((err)=>{
                        if(err){
                            res.status(400).json({"Message": "Error"});
                        }
                        else{
                            res.status(200).json({"Message": "Deleted","embId":embId});
                        }
                    })
                }else
                {
                    res.status(400).json({"Message": "Error"});
                }
            }
        })
    });
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        const {count, byteCount,data} = req.body;
        const {userId,deviceId,embId} = req.params;

        const embUart = EmbUart({
            userId:userId,
            deviceId:deviceId,
            embId:embId,
            count:count,
            byteCount:byteCount,
            data:data
        });
        
        embUart.save((err)=>{
            if(err){
                res.status(400).json({"Message":"Bad Request"});
            }
            else{
                EmbDevice.updateOne({"_id":embId},
                {$set:{uart:embUart}},(err,doc)=>{
                    if(err){
                        res.status(400).json({"Message":"Bad Request"});
                    }
                    else{
                        if(doc){
                            res.status(201).json(doc);
                        }
                        else{
                            res.status(404).json({"Message":"Not Exist"});
                        }
                    }
                })
            } 
        })
    });
}
