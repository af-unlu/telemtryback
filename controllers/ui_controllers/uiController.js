//#region depends
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
        const { deviceId } = req.params.deviceId;
        UiDevice.findOne({ "deviceId": deviceId }, (err, found) => {
            if (err) {
                res.status(400).json({ "Message": "Bad Request" });
            }
            else {
                res.status(200).json(found);
            }
        });
    })
}


module.exports.create_child = async (req, res) => {
    taskToDo(req, res, () => {
        //check if this device has ui exist?
        const {deviceId } = req.params;
        UiDevice.findOne({ "deviceId": deviceId })
            .exec((err, doc) => {
                if (err) {
                    res.status(400).json({ "Message": "Something went wrong", "Error": err });
                }
                else {
                    if (doc != null) {
                        res.status(409).json({ "Message": "The Object you wanted to create is already exist" });
                    }
                    else {
                        const newUiDev = UiDevice({
                            deviceId: deviceId,
                            widgets: []
                        });
                        newUiDev.save((err) => {
                            if (err) {
                                res.status(400).json({ "Message": "Bad Request 1", "Error": err });
                            } else {
                                Device.updateOne({ "_id": deviceId },
                                    { $set: { Ui: newUiDev._id } },
                                    (err) => {
                                        if (err) {
                                            res.status(400).json({ "Message": "Bad Request 2", "Error": err });
                                        }
                                        else {
                                            res.status(201).json(newUiDev);
                                        }
                                    });
                            }
                        });
                    }
                }
            })
    })
}