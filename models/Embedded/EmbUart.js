//Bir CAN Mesajı
const mongoose = require('mongoose');

const embUartSchema = new mongoose.Schema({
  count:{
    type: Number,
    required: [true, 'Error Message']
  },
  byteCount:{
    type: Number,
    required: [true, 'Error Message']
  },
  data:[{ type: mongoose.Types.ObjectId, ref: 'EmbData' }],

});

module.exports = mongoose.model('EmbUart', embUartSchema);