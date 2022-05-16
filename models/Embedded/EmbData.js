//bir paket içerisinde bulunan bir veri, örn bir sıcaklık verisi
const mongoose = require('mongoose');

const embDataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'EmbData.type'],
  },
  name: {
    type: String,
    required: [true, 'EmbData.name'],
  },
  index: {
    type: Number,
    required: [true, 'EmbData.index']
  },
  log: {
    type: Number,
    required: [true, 'EmbData.log']
  }
},{ _id : false ,versionKey: false});

const EmbData = embDataSchema;
module.exports = EmbData;