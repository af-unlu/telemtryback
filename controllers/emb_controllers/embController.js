//#region depends
const User = require("../../models/User");
const Device = require("../../models/Device");
const EmbDevice = require("../../models/Embedded/EmbDevice");
const EmbCanMessage = require("../../models/Embedded/EmbCanMessage");
const EmbUart = require("../../models/Embedded/EmbUart");

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


//Populated Message, hope it works
module.exports.get = async (req, res) => {
    taskToDo(req, res, () => {
        const {embId} = req.params;
        EmbDevice.findOne({ "_id": embId })
            .populate([
                {
                    path: 'uart',
                    model: 'EmbUart'
                },
                {
                    path: "can",
                    populate: {
                        path: 'msgs',
                        model: 'EmbCanMessage'
                    }
                }
            ])
            .exec((err, doc) => {
                if (err) {
                    res.status(400).json({ "Message": "Something went wrong", "Error": err });
                }
                else {
                    res.status(200).json(doc);
                }
            })
    });
}

module.exports.update = async (req, res) => {
    taskToDo(req, res, () => {
        const { log_ms } = req.body;
        const {embId} = req.params;
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
    taskToDo(req, res, () => {
        const { count, byteCount, data } = req.body;
        const { embId } = req.params;

        EmbUart.findOne({ "embId": embId })
            .exec((err, doc) => {
                if (err) {
                    res.status(400).json({ "Message": "Something went wrong", "Error": err });
                }
                else {
                    if (doc != null) {
                        res.status(409).json({ "Message": "The Object you wanted to create is already exist" });
                    }
                    else {
                        const embUart = EmbUart({
                            embId: embId,
                            count: count,
                            byteCount: byteCount,
                            data: data
                        });

                        embUart.save((err) => {
                            if (err) {
                                res.status(400).json({ "Message": "Bad Request", "Error": err });
                            }
                            else {
                                EmbDevice.updateOne({ "_id": embId },
                                    { $set: { uart: embUart } }, (err, doc) => {
                                        if (err) {
                                            res.status(400).json({ "Message": "Bad Request", "Error": err });
                                        }
                                        else {
                                            if (doc) {
                                                res.status(201).json(embUart);
                                            }
                                            else {
                                                res.status(404).json({ "Message": "Not Exist" });
                                            }
                                        }
                                    })
                            }
                        })
                    }
                }
            })
    });
}
