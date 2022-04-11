const mongoose = require('mongoose');
const EmbData = require('./EmbData');

const embI2CSchema = new mongoose.Schema({
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


embI2CSchema.pre('remove',async function (next) {
  mongoose.model('EmbDevice').updateOne({"_id":this.embId},
  {$set:{"i2c":null}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
  next();
});

const EmbI2C = mongoose.model('EmbI2C', embI2CSchema);
module.exports = EmbI2C;