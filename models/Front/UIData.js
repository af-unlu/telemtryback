//bir paket içerisinde bulunan bir veri, örn bir sıcaklık verisi
const mongoose = require('mongoose');


const uiDataSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, 'Please enter a name'],
    },
    dataType :{
        type:String,
        required: [true, 'Please enter the type of data'],
    },
    stIndex:{
        type:Number,
        required: [true, 'Please enter the starting index of data']
    },
    endIndex:{
        type:Number,
        required: [true, 'Please enter the ending index of data']
    }
  });

module.exports = uiDataSchema;