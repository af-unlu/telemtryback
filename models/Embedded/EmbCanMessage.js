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
  datas:[EmbData],

});

//the action before saving
embCanMessageSchema.pre('save', async function(next) {
   
});

//a static function for the model
embCanMessageSchema.statics.login = async function(param1, param2) {
  console.log(this.name);
};

const EmbCanMessage = mongoose.model('emb_can_message', embCanMessageSchema);

module.exports = EmbCanMessage;