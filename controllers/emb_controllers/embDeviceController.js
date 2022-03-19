//#region depends
const generateApiKey = require('generate-api-key');

const Device = require('../../models/Device');
const EmbDevice = require("../../models/Embedded/EmbDevice");

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

const generateHardKey = ()=>{
    return generateApiKey({ method: 'string', prefix: 'HardConfig', pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+'});
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
        /*EmbDevice.findOne({"deviceId":req.params.deviceId},
        (err,found)=>{
            if(err){
                res.status(400).json({
                    "Message":"Error"
                });
            }
            else{
                res.status(200).json(found);
            }
        })*/
    })
}

module.exports.hardConfigGet = async (req, res) => {
    EmbDevice.findOne({"api_key":req.params.apikey},(err,found)=>{
        if(err){
            res.status(400).json({
                "Message":"Bad Request"
            });
        }
        else{
            if(found){
                res.status(200).json(found);
            }else{
                res.status(404).json({"Message":"404 Not Found"});
            }
        }
    })
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        const newEmbDev = EmbDevice({
            userId:req.params.userId,
            deviceId:req.params.deviceId,
            api_key:generateHardKey(),
            can:{
                count:0,
                msgs:null
            },
            uart:null
        });
        newEmbDev.save();
        Device.updateOne({"_id":req.params.deviceId},
        { "$set": { Emb: newEmbDev._id } },
        (err)=>{
            if(err){
                res.status(400).json({
                    "Message":"Bad Request"
                });
            }
            else{
                res.status(201).json(newEmbDev);
            }
        });
    })
}
