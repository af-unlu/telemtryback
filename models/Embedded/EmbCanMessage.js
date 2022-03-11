//Bir CAN Mesajı
const mongoose = require('mongoose');
const EmbData = require('./EmbData');

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
  data:[EmbData.schema],

});

const EmbCanMessage = mongoose.model('emb_can_message', embCanMessageSchema);

module.exports = EmbCanMessage;