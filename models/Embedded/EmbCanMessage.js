//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');

const embCanMessageSchema = new mongoose.Schema({
  embId: {
    type: mongoose.Types.ObjectId,
    ref: 'EmbDevice',
    required: [true, 'Error Message'],
  },
  isEx: {
    type: Number,
    required: [true, 'Error Message']
  },
  mId: {
    type: Number,
    required: [true, 'Error Message']
  },
  dlc: {
    type: Number,
    required: [true, 'Error Message']
  },
  data: {
    type: [EmbData]
  }
},{versionKey: false});

embCanMessageSchema.pre('remove',async function (next) {
  mongoose.model('EmbDevice').updateOne({"_id":this.embId},
  {$pull:{"can.msgs":this._id},$inc:{"can.count":-1}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
  next();
});


const EmbCanMessage = mongoose.model('EmbCanMessage', embCanMessageSchema);
module.exports = EmbCanMessage;