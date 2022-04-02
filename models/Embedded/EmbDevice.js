const mongoose = require('mongoose');

const EmbCanMessage = require("./EmbCanMessage");
const EmbUart = require("./EmbUart");

const embDeviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Error Message'],
    },
    deviceId:{
        type: mongoose.Types.ObjectId, 
        ref: 'Device' ,
        required: [true, 'Error Message'],
    },
    api_key :{
        type:String,
        required: [true, 'Error Message']
    },
    log_ms:{
        type:Number,
        default: 1000,
        required: [true, 'Error Message']
    },
    uart:{ type: mongoose.Types.ObjectId, ref: 'EmbUart' },
    can:{
        count :{
            type:Number,
            required: [true, 'Error Message']
        },
        msgs:[{ type: mongoose.Types.ObjectId, ref: 'EmbCanMessage' }]
    }
});

embDeviceSchema.pre('remove',async function (next) {
  mongoose.model('Device').updateOne({"_id":this.deviceId},
  {$set:null},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
  EmbCanMessage.find({"embId":this._id},(err,doc)=>{
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
  EmbUart.findOne({"embId":this._id},(err,doc)=>{
    if(err){
      throw Error('Find : Error Finding Child EmbUart');
    }
    else{
      if(doc){
        doc.remove((err)=>{
          if(err){
            throw Error('Delete : Error Delete Child EmbUart');
          }
        })
      }
    }
  });
  next();
});

const EmbDevice =mongoose.model('EmbDevice', embDeviceSchema);
module.exports = EmbDevice;