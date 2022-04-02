//#region depends
const EmbDevice = require("../../models/Embedded/EmbDevice");
const EmbCanMessage = require("../../models/Embedded/EmbCanMessage");

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
//const notSelected = ["-_id", "-userId", "-deviceId"];
module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        EmbDevice.findOne({"_id":req.params.embId})
        .populate([
            {
                path:"can",
                populate:{
                    path: 'msgs',
                    model: 'EmbCanMessage'
                }
            }
        ])
        .select(["can"])
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                if(doc){
                    res.status(200).json(doc);
                }
                else{
                    res.status(404).json({"Message":"Not Found"});
                }
            }
        })
    })
}

module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(405).json({"Message":"Not Allowed"});
    })
}

module.exports.delete = async (req, res) => {
    taskToDo(req,res,()=>{
        EmbCanMessage.find({"embId":req.params.embId},
        (err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                if(doc){
                    let error;
                    doc.forEach(element => {
                        element.remove((err)=>{
                            error=err;
                        })
                        if(error){
                            res.status(400).json({"Message":"Error Deleting Childs : Can Messages"});
                        }
                        else{
                            es.status(200).json({"Message":"Succes"});
                        }
                    });
                }
                else{
                    res.status(404).json({"Message":"Not Found"});
                }
            }
        });
    })
}

module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        const {isEx,mId,dlc,data} = req.body;
        const {userId,deviceId,embId} = req.params;

        const newCanMessage = EmbCanMessage({
            userId:userId,
            deviceId:deviceId,
            embId:embId,
            isEx:isEx,
            mId:mId,
            dlc:dlc,
            data:data
        })
        newCanMessage.save((err)=>{
            if(err){
                res.status(400).json({"Message":"Bad Request"});
            }
            else{
                EmbDevice.updateOne({"_id":deviceId},
                {$push:{"can.msgs":this._id},$inc:{"can.count":1}},
                (err,doc)=>{
                    if(err){
                        res.status(400).json({"Message":"Bad Request : Updating Parent"});
                    }
                    else{
                        if(doc){
                            res.status(201).json(doc);
                        }
                        else{
                            res.status(404).json({"Message":"Not Exist"});
                        }
                    }
                });  
            }
        })
    })
}