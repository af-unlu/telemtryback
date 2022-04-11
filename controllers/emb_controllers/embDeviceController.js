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
                    res.status(400).json({ "Message": "Error" });
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
                path: 'rs485',
                model: 'EmbSerial',
                select: populateNotSelected,
            },
            {
                path: 'spi',
                model: 'EmbSerial',
                select: populateNotSelected,
            },
            {
                path: 'i2c',
                model: 'EmbSerial',
                select: populateNotSelected,
            },
            {
                path: "can",
                populate: {
                    path: 'msgs',
                    model: 'EmbCanMessage',
                    select: populateNotSelected,
                },
            }
        ])
        .exec((err, doc) => {
            if (err) {
                res.status(400).json({
                    "Message": "Bad Request"
                });
            }
            else {
                res.status(200).json(doc);
            }
        });
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(405).json({"Message":"Not Allowed"});
    })
}
