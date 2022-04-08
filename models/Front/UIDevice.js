const mongoose = require('mongoose');
const UiWidget = require("./UIWidget");

const uiDeviceSchema = new mongoose.Schema({
    deviceId:{
        type: mongoose.Types.ObjectId, 
        ref: 'Device' ,
        required: [true, 'Error Message'],
    },
    widgets:{
        type:[{ type: mongoose.Types.ObjectId, ref: 'UiWidget' }]
    }
},{versionKey: false});


uiDeviceSchema.pre('remove',async function (next) {
  mongoose.model('Device').updateOne({"_id":this.deviceId},
  {$set:{Ui:null}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
    UiWidget.find({"uiId":this._id},(err,doc)=>{
      if(err){
        throw Error('Find : Error Finding Child EmbCanMessage');
      }
      else{
        if(doc){
          doc.forEach(element => {
            element.remove((err)=>{
              if(err){
                throw Error('Delete : Error Delete Child EmbCanMessage');
              }
            })
          });
        }
      }
    });
    next();
  });

const UiDevice = mongoose.model('UiDevice', uiDeviceSchema);
module.exports = UiDevice;