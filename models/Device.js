const mongoose = require('mongoose');

const EmbDevice = require("./Embedded/EmbDevice");
const UiDevice = require("./Front/UIDevice");

const deviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Device.userId'],
    },
    name: {
        type: String,
        required: [true, 'Device.name'],
    },
    props: {
        type: Object
    },
    //bunların default işlemleri vardı, otomatik update vs edildiğinde kendi yazıyordu
    Ui: {
        type: { type: mongoose.Types.ObjectId, ref: 'UiDevice' }
    },
    Emb: {
        type: { type: mongoose.Types.ObjectId, ref: 'EmbDevice' }
    },
},
{ timestamps: true ,versionKey: false});


deviceSchema.pre('remove',async function (next) {
    mongoose.model('User').updateOne({"_id":this.userId},
    {$pull:{devices:this._id}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference array');
      }
    });
    EmbDevice.find({"deviceId":this._id},(err,found)=>{
      if(err){
        throw Error('Delete : Error finding Emb of the Device');
      }
      else{
          if(found){
            found.forEach((item)=>{
              item.remove((err)=>{
                if(err){
                  throw Error('Delete : Error deleting EmbDevice');
                }
              });
            })
          }
      }
    })
    UiDevice.find({"deviceId":this._id},(err,found)=>{
        if(err){
          throw Error('Delete : Error finding Ui of the Device');
        }
        else{
            if(found){
              found.forEach((item)=>{
                item.remove((err)=>{
                  if(err){
                    throw Error('Delete : Error Deleting UiDevice');
                  }
                });
              })
            }
        }
      })
    next();
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;