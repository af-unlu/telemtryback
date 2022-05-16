//#region depends
const generateApiKey = require('generate-api-key');

const Device = require('../../models/Device');
const EmbDevice = require("../../models/Embedded/EmbDevice");

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

const generateHardKey = () => {
    return generateApiKey({ method: 'string', prefix: 'HardConfig', pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+' });
}


const notSelected = ["-_id", "-userId", "-deviceId"];
const populateNotSelected = { '_id': 0,'embId':0};
//#endregion


module.exports.get = async (req, res) => {
    taskToDo(req, res, () => {
        const { deviceId } = req.params;
        EmbDevice.findOne({ "deviceId": deviceId },
            (err, found) => {
                if (err) {
                    res.status(400).json({"Message":"Error","Error":err});
                }
                else{
                    res.status(200).json(found);
                }
            })
    })
}



module.exports.hardConfigGet = async (req, res) => {
    EmbDevice.findOne({ "api_key": req.params.apikey })
        .select(notSelected)
        .populate([
            {
                path: "can",
                populate: {
                    path: 'messages',
                    model: 'EmbCanMessage',
                    select: populateNotSelected,
                },
            },
            {
                path: 'rs485',
                model: 'EmbRS485',
                select: populateNotSelected,
            },
            {
                path: 'i2c',
                model: 'EmbI2C',
                select: populateNotSelected,
            },
            {
                path: 'spi',
                model: 'EmbSPI',
                select: populateNotSelected,
            }
        ])
        .exec((err, doc) => {
            if (err) {
                res.status(400).json({"Message":"Error","Error":err});
            }
            else {
                //Doc nesnesi databaseden dönen veri
                const temp = {
                    api_key: doc.api_key,
                    log_ms:doc.log_ms,
                    can : doc.can,
                    rs485 :doc.rs485,
                    spi:doc.spi,
                    i2c:doc.i2c
                }
                res.status(200).json(temp);
            }
        });
}

module.exports.create_child = async (req, res) => {
    taskToDo(req, res, () => {
        //check if this device has embd exist?
        const {deviceId } = req.params;
        EmbDevice.findOne({ "deviceId": deviceId })
            .exec((err, doc) => {
                if (err) {
                    res.status(400).json({"Message":"Error","Error":err});
                }
                else {
                    if (doc != null) {
                        res.status(409).json({ "Message": "The Object you wanted to create is already exist" });
                    }
                    else{
                        const newEmbDev = EmbDevice({
                            deviceId: deviceId,
                            api_key: generateHardKey(),
                            can: {
                                count: 0,
                                msgs: []
                            },
                            rs485: null,
                            spi:null,
                            i2c:null

                        });
                        newEmbDev.save((err) => {
                            if (err) {
                                res.status(400).json({"Message":"Error","Error":err});
                            } else {
                                Device.updateOne({ "_id": deviceId },
                                    { $set: { Emb: newEmbDev._id } },
                                    (err) => {
                                        if (err) {
                                            res.status(400).json({"Message":"Error","Error":err});
                                        }
                                        else {
                                            res.status(201).json(newEmbDev);
                                        }
                                    });
                            }
                        });
                    }
                }
            })
    })
}
