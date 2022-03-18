//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');
const embUartSchema = new mongoose.Schema({
  userId: {
    type: { type: mongoose.Types.ObjectId, ref: 'User' },
    required: [true, 'Please enter a UserId'],
  },
  embId: {
    type: { type: mongoose.Types.ObjectId, ref: 'EmbDevice' }
  },
  count:{
    type: Number,
    required: [true, 'Error Message']
  },
  byteCount:{
    type: Number,
    required: [true, 'Error Message']
  },
  data:{
    type:[EmbData.schema]
  }

});
const EmbUart =  mongoose.model('EmbUart', embUartSchema);
module.exports = EmbUart;