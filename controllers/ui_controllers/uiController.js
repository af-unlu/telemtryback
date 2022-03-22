//#region depends
const generateApiKey = require('generate-api-key');
const User = require("../../models/User");
const UiDevice = require("../../models/Front/UIDevice");
const Device = require("../../models/Device");

require('dotenv').config();

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

//#endregion

// Params : deviceId & userId

//Gets the page if exist,
//Not populated
module.exports.get = async (req, res) => {
    taskToDo(req, res, () => {
        UiDevice.findOne({ "deviceId": req.params.deviceId }, (err, found) => {
            if (err) {
                res.status(400).json({ "Message": "Bad Request" });
            } else {
                if (found) {
                    res.status(200).json(found);
                } else {
                    res.status(404).json({ "Message": "Not Found" });
                }
            }
        });
    })
}

//creates a ui page to a device 
//also if there is already a page exist for that device it will overtite and create a new one
// its not a bug its a feature
module.exports.create_child = async (req, res) => {
    taskToDo(req, res, () => {
        const { name } = req.body;
        const newUiDev = UiDevice({
            userId: req.params.userId,
            deviceId: req.params.deviceId,
            name: name,
            widgets: []
        });
        newUiDev.save();
        Device.updateOne({ "_id": req.params.deviceId },
            { "$set": { Ui: newUiDev._id } },
            (err) => {
                if (err) {
                    res.status(400).json({ "Message": "Bad Request" });
                }
                else {
                    res.status(201).json(newUiDev);
                }
            });
    })
}