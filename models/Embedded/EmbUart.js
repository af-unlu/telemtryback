//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');

const embUartSchema = new mongoose.Schema({
  count:{
    type: Number,
    required: [true, 'Error Message']
  },
  byteCount:{
    type: Number,
    required: [true, 'Error Message']
  },
  data:[EmbData.schema],

});

const EmbUart = mongoose.model('emb_uart', embUartSchema);

module.exports = EmbUart;