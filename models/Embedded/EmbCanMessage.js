//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');

const embCanMessageSchema = new mongoose.Schema({
  embId: {
    type: mongoose.Types.ObjectId,
    ref: 'EmbDevice',
    required: [true, 'EmbCanMessage.embId'],
  },
  is_ex: {
    type: Number,
    required: [true, 'EmbCanMessage.is_ex']
  },
  id: {
    type: Number,
    required: [true, 'EmbCanMessage.id']
  },
  dlc: {
    type: Number,
    required: [true, 'EmbCanMessage.dlc']
  },
  data_count:{
    type:Number,
    required: [true, 'EmbCanMessage.data_count']
  },
  data: {
    type: [EmbData]
  }
},{versionKey: false});

embCanMessageSchema.pre('remove',async function (next) {
  mongoose.model('EmbDevice').updateOne({"_id":this.embId},
  {$pull:{"can.messages":this._id},$inc:{"can.count":-1}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
  next();
});


const EmbCanMessage = mongoose.model('EmbCanMessage', embCanMessageSchema);
module.exports = EmbCanMessage;