//#region depends
const generateApiKey = require('generate-api-key');
const User = require("../../models/User");

const UiWidget = require('../../models/Front/UIWidget');
const UiDevice = require('../../models/Front/UIDevice');


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

// Params userId, deviceId, uiId

//get the page with widgets populated
module.exports.get = async (req, res) => {
    taskToDo(req, res, () => {
        UiDevice.findOne({"_id":req.params.uiId})
        .populate({
            path: 'widgets'
        })
        .exec(function (err, found) {
            if(err){
                res.status(400).json({ "Message": "Bad Request" });
            }else
            {
                if(found){
                    res.status(200).json(found);
                }else{
                    res.status(404).json({ "Message": "Not Found" });
                }
            }
        });
    })
}

module.exports.update = async (req, res) => {
    taskToDo(req, res, () => {
        res.status(201).json({ "Page": "Put", "userId": req.params.userId });
    })
}

module.exports.delete = async (req, res) => {
    taskToDo(req, res, () => {
        res.status(200).json({ "Page": "Delete", "userId": req.params.userId });
    })
}

module.exports.create_child = async (req, res) => {
    taskToDo(req, res, () => {
        const { props, w_type, data, is_hidden } = req.body;
        const newWidget = UiWidget({
            userId: req.params.userId,
            uiId: req.params.uiId,
            props: props,
            w_type: w_type,
            data: data,
            is_hidden: is_hidden
        });
        newWidget.save((err)=>{
            if(err){
                res.status(400).json({ "Message": "Bad Request 1" });
            }
            else{
                UiDevice.updateOne({ "_id": req.params.uiId },
                { "$push": { widgets: newWidget } },
                (err) => {
                    if (err) {
                        res.status(400).json({ "Message": "Bad Request 2" });
                    }
                    else {
                        res.status(201).json(newWidget);
                    } 
                });       
            }
        });

    })
}