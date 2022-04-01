const mongoose = require('mongoose');

const EmbDevice = require("./Embedded/EmbDevice");
const UiDevice = require("./Front/UIDevice");

const deviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Error Message'],
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    props: {
        type: Object
    },
    apikey: {
        type: String,
        required: [true, 'Error Message'],
    },
    //bunların default işlemleri vardı, otomatik update vs edildiğinde kendi yazıyordu
    Ui: {
        type: { type: mongoose.Types.ObjectId, ref: 'UiDevice' }
    },
    Emb: {
        type: { type: mongoose.Types.ObjectId, ref: 'EmbDevice' }
    },
},
{ timestamps: true });


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