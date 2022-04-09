//bir paket içerisinde bulunan bir veri, örn bir sıcaklık verisi
const mongoose = require('mongoose');

const embDataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please enter the type of data'],
  },
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  index: {
    type: Number,
    required: [true, 'Please enter the index of data']
  },
  log: {
    type: Number,
  }
},{ _id : false ,versionKey: false});

const EmbData = embDataSchema;
module.exports = EmbData;