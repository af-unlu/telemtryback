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
  datas:[EmbData],

});

//the action before saving
embUartSchema.pre('save', async function(next) {
   
});

//a static function for the model
embUartSchema.statics.login = async function(param1, param2) {
  console.log(this.name);
};

const EmbUart = mongoose.model('emb_uart', embUartSchema);

module.exports = EmbUart;