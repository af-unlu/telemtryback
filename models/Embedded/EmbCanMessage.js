//Bir CAN Mesajı
const mongoose = require('mongoose');
const embDataSchema = require('./EmbData');

const embCanMessageSchema = new mongoose.Schema({
  isEx: {
    type: Boolean,
    required: [true, 'Error Message']
  },
  mId: {
    type: String,
    required: [true, 'Error Message']
  },
  dlc:{
    type: Number,
    required: [true, 'Error Message']
  },
  data:[embDataSchema],

});

module.exports = embCanMessageSchema;