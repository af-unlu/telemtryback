//Bir CAN Mesajı
const mongoose = require('mongoose');
const embDataSchema = require('./EmbData');

const embUartSchema = new mongoose.Schema({
  count:{
    type: Number,
    required: [true, 'Error Message']
  },
  byteCount:{
    type: Number,
    required: [true, 'Error Message']
  },
  data:[embDataSchema],

});

module.exports = embUartSchema;