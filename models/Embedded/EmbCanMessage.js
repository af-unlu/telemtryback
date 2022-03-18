//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');

const embCanMessageSchema = new mongoose.Schema({
  userId: {
    type: { type: mongoose.Types.ObjectId, ref: 'User' },
    required: [true, 'Please enter a UserId'],
  },
  embId: {
    type: { type: mongoose.Types.ObjectId, ref: 'EmbDevice' }
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
  data:{
    type:[EmbData.schema]
  }

});
const EmbCan = mongoose.model('EmbCan', embCanMessageSchema);
module.exports = EmbCan;