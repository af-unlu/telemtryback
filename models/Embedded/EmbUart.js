//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');
const embUartSchema = new mongoose.Schema({
  embId: {
    type: mongoose.Types.ObjectId,
    ref: 'EmbDevice',
    required: [true, 'Error Message'],
  },
  count: {
    type: Number,
    required: [true, 'Error Message']
  },
  byteCount: {
    type: Number,
    required: [true, 'Error Message']
  },
  data: {
    type: [EmbData]
  }
});

embUartSchema.pre('remove',async function (next) {
  mongoose.model('EmbDevice').updateOne({"_id":this.embId},
  {$set:{"uart":null}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
  next();
});

const EmbUart = mongoose.model('EmbUart', embUartSchema);
module.exports = EmbUart;