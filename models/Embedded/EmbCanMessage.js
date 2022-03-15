//Bir CAN Mesajı
const mongoose = require('mongoose');

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
  data:[{ type: mongoose.Types.ObjectId, ref: 'EmbData' }],

});

module.exports = mongoose.model('EmbCan', embCanMessageSchema);