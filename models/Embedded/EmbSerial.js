//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');
const embSerialSchema = new mongoose.Schema({
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


const EmbUart = mongoose.model('EmbSerial', embSerialSchema);
module.exports = EmbUart;