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


const EmbRS485 = mongoose.model('EmbRS485', embRS485Schema);
module.exports = EmbRS485;