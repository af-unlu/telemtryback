//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');

const embCanMessageSchema = new mongoose.Schema({
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
  embId: {
    type: mongoose.Types.ObjectId,
    ref: 'EmbDevice',
    required: [true, 'Error Message'],
  },
  isEx: {
    type: Boolean,
    required: [true, 'Error Message']
  },
  mId: {
    type: String,
    required: [true, 'Error Message']
  },
  dlc: {
    type: Number,
    required: [true, 'Error Message']
  },
  data: {
    type: [EmbData.schema]
  }

});

//Add Data
//Get by Id etc

const EmbCanMessage = mongoose.model('EmbCanMessage', embCanMessageSchema);
module.exports = EmbCanMessage;