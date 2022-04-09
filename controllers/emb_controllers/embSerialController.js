//#region depends
const EmbSerial = require("../../models/Embedded/EmbSerial");
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
        EmbSerial.findOne({"embId":embId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                res.status(200).json(doc);
            }
        });
    })
}

module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        const{count,byteCount,data} = req.body;
        const {embId} = req.params;
        EmbSerial.updateOne({"embId":embId},
        {
            $set:{
                "count":count,
                "byteCount":byteCount,
                "data":data
            }
        })
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
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
        EmbSerial.findOne({"embId":embId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                if(doc !=null){
                    doc.remove((err)=>{
                        if(err){
                            res.status(400).json({"Message":"Error : Delete Error"});
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
    taskToDo(req,res,()=>{
        res.status(405).json({"Message":"Not Allowed"});
    })
}