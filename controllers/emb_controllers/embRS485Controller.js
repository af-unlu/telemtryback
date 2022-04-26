//#region depends
const EmbRS485 = require("../../models/Embedded/EmbRS485");
const EmbDevice = require("../../models/Embedded/EmbDevice");

const taskToDo= (req,res,task)=>{
    if(res.locals.myStatus === 200){
        if(res.locals.user._id.toString() == req.params.userId){
            task();
        }
        else
        {
            res.status(403).json({"message":"403 Forbidden"});
        }
    }
    else{
        res.status(401).json({"message":"401 Unauthorized"});
    }
}  
//#endregion

module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        const {embId} = req.params;
        EmbRS485.findOne({"embId":embId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error","Error":err});
            }
            else{
                res.status(200).json(doc);
            }
        });
    })
}

module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        const{count,byte_count,messages} = req.body;
        const {embId} = req.params;
        EmbRS485.updateOne({"embId":embId},
        {
            $set:{
                "count":count,
                "byte_count":byte_count,
                "messages":messages
            }
        })
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error","Error":err});
            }
            else{
                res.status(200).json(doc);
            }
        });
    })
}

module.exports.delete = async (req, res) => {
    taskToDo(req,res,()=>{
        const {embId} = req.params;
        EmbRS485.findOne({"embId":embId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error","Error":err});
            }
            else{
                if(doc !=null){
                    doc.remove((err)=>{
                        if(err){
                            res.status(400).json({"Message":"Error : Delete Error","Error":err});
                        }
                        else{
                            res.status(200).json({"Message":"Item Deleted"});
                        }
                    })
                }
                else{
                    res.status(404).json({"Message":"The Item you wanted to delete is not exist"});
                }
            }
        });
    })
}

module.exports.create_child = async (req, res) => {
    taskToDo(req, res, () => {
        const {count, byte_count, messages} = req.body;
        const { embId } = req.params;
        EmbRS485.findOne({ "embId": embId })
        .exec((err, doc) => {
            if (err) {
                res.status(400).json({"Message":"Error","Error":err});
            }
            else {
                if (doc != null) {
                    res.status(409).json({ "Message": "The Object you wanted to create is already exist" });
                }
                else {
                    const embSerial = EmbRS485({
                        embId: embId,
                        count: count,
                        byte_count: byte_count,
                        messages: messages,
                    });
                    embSerial.save((err) => {
                        if (err) {
                            res.status(400).json({"Message":"Error","Error":err});
                        }
                        else {
                            EmbDevice.updateOne({ "_id": embId },
                                { $set: { rs485: embSerial._id } }, (err, doc) => {
                                    if (err) {
                                        res.status(400).json({"Message":"Error","Error":err});
                                    }
                                    else {
                                        if (doc) {
                                            res.status(201).json(embSerial);
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