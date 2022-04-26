const mongoose = require('mongoose');
const EmbData = require('./EmbData');
const embSPISchema = new mongoose.Schema({
  embId: {
    type: mongoose.Types.ObjectId,
    ref: 'EmbDevice',
    required: [true, 'EmbSPI.embId'],
  },
  count: {
    type: Number,
    required: [true, 'EmbSPI.count']
  },
  byte_count: {
    type: Number,
    required: [true, 'EmbSPI.byte_count']
  },
  messages: {
    type: [EmbData]
  }
},{versionKey: false});

embSPISchema.pre('remove',async function (next) {
  mongoose.model('EmbDevice').updateOne({"_id":this.embId},
  {$set:{"spi":null}},
    (err)=>{
      if(err){
        throw Error('Delete : Error emptying reference');
      }
    });  
  next();
});

const EmbSPI = mongoose.model('EmbSPI', embSPISchema);
module.exports = EmbSPI;