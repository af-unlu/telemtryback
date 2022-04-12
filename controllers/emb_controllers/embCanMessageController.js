//#region depends

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

//router.use("/user/:userId/device",require('./subRoutes/deviceRoutes'));
//router.route('/:embId/can/:messageId')

module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        const {messageId} = req.params;
        EmbCanMessage.findOne({"_id":messageId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                res.status(200).json(doc);
            }
        });
    });
}


module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        const{is_ex,id,dlc,data_count,data} = req.body;
        const {messageId} = req.params;
        EmbCanMessage.updateOne({"_id":messageId},
        {
            $set:{
                "is_ex":is_ex,
                "id":id,
                "dlc":dlc,
                "data_count":data_count,
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
        const {messageId} = req.params;
        EmbCanMessage.findOne({"_id":messageId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                if(doc){
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
                    res.status(404).json({"Message":"Not Found"});
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