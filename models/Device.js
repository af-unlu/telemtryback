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
    console.log("Device Delete");
    EmbDevice.find({"deviceId":this._id},(err,found)=>{
      if(err){
        throw Error('Delete : Error finding Emb of the Device');
      }
      else{
          if(found){
            found.forEach((item)=>{
              item.remove();
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
                item.remove();
              })
            }
        }
      })
    next();
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;