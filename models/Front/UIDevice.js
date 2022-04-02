const mongoose = require('mongoose');

const uiDeviceSchema = new mongoose.Schema({
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
    name:{
        type: String,
        required: [true, 'Please enter a name'],
    },
    widgets:{
        type:[{ type: mongoose.Types.ObjectId, ref: 'UiWidget' }]
    }
},{ timestamps: true }
);

//Add Widget
//Query by UserID & Device ID etc
//What to do when delete

uiDeviceSchema.pre('remove',async function (next) {
    /*Device.find({"userId":this._id},(err,found)=>{
      if(err){
        throw Error('Delete : Error finding devices of the user');
      }
      else{
        if(found){
          found.forEach((item)=>{
            item.remove();
          })
        }
      }
    })*/
    console.log("Ui Deleted");
    next();
  });

const UiDevice = mongoose.model('UiDevice', uiDeviceSchema);
module.exports = UiDevice;