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
    return generateApiKey({ method: 'string', prefix: 'HardConfig', pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+' });
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

//nope its bulk update
module.exports.update = async (req, res) => {
    taskToDo(req, res, () => {
        res.status(201).json({ "Page": "Put", "userId": req.params.userId });
    })
}


//deleting all devices of a user
//delete all of childs also but its next to do
module.exports.delete = async (req, res) => {
    taskToDo(req, res, () => {
        const userId = req.params.userId;
        Device.deleteMany({ "userId": req.params.userId },(err)=>{
            if(err){
                res.status(400).json({"Message": "Bad Here"});
            }else{
                User.updateOne({ "_id": userId }, { "$set": { devices: [] } }, (err) => {
                    if (err) {
                        res.status(400).json({"Message": "Bad Request"});
                    }else
                    {
                        res.status(201).json({"Message": "Succes"});
                    }
                })
            }
        })

    })
}

//Create a device
module.exports.create_child = async (req, res) => {
    taskToDo(req, res, () => {
        const { name, props } = req.body;
        const newDevice = Device({
            userId: req.params.userId,
            name: name,
            props: props,
            apikey: generateHardKey(),
            Ui: null,
            Emb: null
        });
        newDevice.save();
        User.updateOne({ "_id": req.params.userId },
            { "$push": { devices: newDevice } },
            (err) => {
                if (err) {
                    res.status(400).json({"Message": "Bad Request"});
                }
                else {
                    res.status(201).json(newDevice);
                }
            });
    })
}