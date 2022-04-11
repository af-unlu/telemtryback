const mongoose = require('mongoose');
const EmbData = require('./EmbData');

const embRS485Schema = new mongoose.Schema({
  embId: {
    type: mongoose.Types.ObjectId,
    ref: 'EmbDevice',
    required: [true, 'Error Message'],
  },
  count: {
    type: Number,
    required: [true, 'Error Message']
  },
  byte_count: {
    type: Number,
    required: [true, 'Error Message']
  },
  messages: {
    type: [EmbData]
  }
},{versionKey: false});

embRS485Schema.pre('remove',async function (next) {
  mongoose.model('EmbDevice').updateOne({"_id":this.embId},
  {$set:{"rs485":null}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
  next();
});


const EmbRS485 = mongoose.model('EmbRS485', embRS485Schema);
module.exports = EmbRS485;