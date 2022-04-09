//#region depends

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
        const {uiId} = req.params;
        UiDevice.findOne({"_id":uiId})
        .populate({
            path: 'widgets'
        })
        .exec((err, doc) => {
            if (err) {
                res.status(400).json({ "Message": "Something went wrong", "Error": err });
            }
            else {
                res.status(200).json(doc);
            }
        })
    })
}

module.exports.update = async (req, res) => {
    taskToDo(req, res, () => {
        res.status(405).json({"Message":"Not Allowed"});
    });
}

module.exports.delete = async (req, res) => {
    taskToDo(req, res, () => {
        const {uiId} = req.params;
        UiDevice.findOne({ "_id": uiId }, (err, doc) => {
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
                            res.status(200).json({ "Message": "Deleted", "uiId": uiId });
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
        const { props, w_type, data, is_hidden } = req.body;
        const {uiId} = req.params;
        const newWidget = UiWidget({
            uiId: uiId,
            props: props,
            w_type: w_type,
            data: data,
            is_hidden: is_hidden
        });
        newWidget.save((err)=>{
            if(err){
                res.status(400).json({ "Message": "Bad Request 1" , "Error": err});
            }
            else{
                UiDevice.updateOne({ "_id": uiId},
                { $push: { widgets: newWidget._id } },
                (err,doc) => {
                    if (err) {
                        res.status(400).json({ "Message": "Bad Request 2" , "Error": err});
                    }
                    else {
                        res.status(201).json(newWidget);
                    } 
                });       
            }
        });

    })
}