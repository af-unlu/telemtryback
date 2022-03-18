//bir paket içerisinde bulunan bir veri, örn bir sıcaklık verisi
const mongoose = require('mongoose');

const embDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  dataType: {
    type: String,
    required: [true, 'Please enter the type of data'],
  },
  Index: {
    type: Number,
    required: [true, 'Please enter the index of data']
  },
  IsLog: {
    type: Boolean,
    // == true der geçeriz required olmasına gerek yok??
  }
});
const EmbData = mongoose.model('EmbData', embDataSchema);
module.exports = EmbData;