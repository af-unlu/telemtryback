//#region depends
const generateApiKey = require('generate-api-key');
require('dotenv').config();
const User = require("../models/User");
const Device = require("../models/Device")


const taskToDo = (req, res, task) => {
    if (res.locals.myStatus === 200) {
        if (res.locals.user._id.toString() == req.params.userId) {
            task();
        }
        else {
            res.status(403).json({ "message": "403 Forbidden" });
        }
    }
    else {
        res.status(401).json({ "message": "401 Unauthorized" });
    }
}

const generateHardKey = () => {
    return generateApiKey({ method: 'string', prefix: 'HardConfig', pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_&+-' });
}

//#endregion

//Get All Devices
module.exports.get = async (req, res) => {
    taskToDo(req, res, () => {
        Device.find({ "userId": req.params.userId },
            (err, found) => {
                if (err) {
                    res.status(400).json({
                        "Message": "Error"
                    });
                }
                else {
                    res.status(200).json(found);
                }
            })
    })
}


//deleting all devices of a user
module.exports.delete = async (req, res) => {
    Device.find({"userId":req.params.userId},(err,found)=>{
        if(err){res.status(400).json({"Message":"Bad Request"});}
        else{
            if(found){
                let erro;
                found.forEach((item)=>{
                    item.remove((err)=>{
                        if(err){
                            erro=err;
                        }
                    });
                })
                if(erro){
                    res.status(400).json({"Message":"Bad Request"});
                }
                else{
                    res.status(200).json({"Message":"Succes"});
                }
            }
            else{
                res.status(400).json({"Message":"Bad Request"});
            }
        }
    });
}

//Create a device and push to Device Array of The User
module.exports.create_child = async (req, res) => {
    taskToDo(req, res, () => {
        const { name, props } = req.body;
        const userId = req.params.userId;
        const newDevice = Device({
            userId: userId,
            name: name,
            props: props,
            apikey: generateHardKey(),
            Ui: null,
            Emb: null
        });
        newDevice.save((err)=>{
            if(err){
                res.status(400).json({"Message":"Invalid Device"});
            }
            else
            {
                User.CreateNewDevice(userId,newDevice,(err)=>{
                    if(err){
                        res.status(400).json({"Message":"Bad Request"});
                    }
                    else
                    {
                        res.status(200).json(
                            {
                            "Message":"New Device Added",
                            "Device":newDevice
                            }
                        )
                    }
                })
            }
        });
    })
}