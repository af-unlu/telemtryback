//#region depends
const UiWidget = require('../../models/Front/UIWidget');
const UiDevice = require('../../models/Front/UIDevice');


require('dotenv').config();

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

/*
checkUser => Logged User 
URL Params : UserId , uiId
Logged UserID and UserID  must match 
*/

//GET return one of ui pages of the user
module.exports.get = async (req, res) => {
    taskToDo(req,res,()=>{
        const {widgetId} = req.params;
        UiWidget.findOne({"_id":widgetId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request", "Error": err});
            }
            else{
                res.status(200).json(doc);
            }
        });
    });
}
//PUT replaces one of ui with request body if valid
module.exports.update = async (req, res) => {
    taskToDo(req,res,()=>{
        const{props,w_type,data,is_hidden} = req.body;
        const {widgetId} = req.params;
        UiWidget.updateOne({"_id":widgetId},
        {
            $set:{
                "props":props,
                "w_type":w_type,
                "data":data,
                "is_hidden":is_hidden
            }
        })
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request", "Error": err});
            }
            else{
                res.status(200).json(doc);
            }
        });
    })
}
//DELETE deletes one
module.exports.delete = async (req, res) => {
    taskToDo(req,res,()=>{
        const {widgetId} = req.params;
        UiWidget.findOne({"_id":widgetId})
        .exec((err,doc)=>{
            if(err){
                res.status(400).json({"Message":"Error : Bad Request"});
            }
            else{
                if(doc){
                    doc.remove((err)=>{
                        if(err){
                            res.status(400).json({"Message":"Error : Delete Error", "Error": err});
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
//DELETE deletes one
module.exports.create_child = async (req, res) => {
    taskToDo(req,res,()=>{
        res.status(405).json({"Message":"Not Allowed"});
    })
}