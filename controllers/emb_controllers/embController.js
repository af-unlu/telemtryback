//#region depends
const EmbDevice = require("../../models/Embedded/EmbDevice");
const EmbSerial = require("../../models/Embedded/EmbSerial");

const generateApiKey = require('generate-api-key');

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


module.exports.get = async (req, res) => {
    const { embId } = req.params;
    EmbDevice.findOne({ "_id": embId })
        .populate([
            {
                path: 'rs485',
                model: 'EmbSerial',
            },
            {
                path: 'spi',
                model: 'EmbSerial',
            },
            {
                path: 'i2c',
                model: 'EmbSerial',

            },
            {
                path: "can",
                populate: {
                    path: 'msgs',
                    model: 'EmbCanMessage',
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


module.exports.update = async (req, res) => {
    taskToDo(req, res, () => {
        const { log_ms } = req.body;
        const { embId } = req.params;
        EmbDevice.updateOne({ "_id": embId },
            { "$set": { log_ms: log_ms } },
            (err, doc) => {
                if (err) {
                    res.status(400).json({ "Message": "Something went wrong", "Error": err });
                }
                else {
                    res.status(200).json(doc);
                }
            })
    });
}


module.exports.delete = async (req, res) => {
    taskToDo(req, res, () => {
        const embId = req.params.embId;
        EmbDevice.findOne({ "_id": embId }, (err, doc) => {
            if (err) {
                res.status(400).json({ "Message": "Something went wrong", "Error": err });
            }
            else {
                if (doc) {
                    doc.remove((err) => {
                        if (err) {
                            res.status(400).json({ "Message": "Something went wrong", "Error": err });
                        }
                        else {
                            res.status(200).json({ "Message": "Deleted", "embId": embId });
                        }
                    })
                } else {
                    res.status(400).json({ "Message": "Something went wrong", "Error": err });
                }
            }
        })
    });
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(405).json({"Message":"Not Allowed"});
    })
}


