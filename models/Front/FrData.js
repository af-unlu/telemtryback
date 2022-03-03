//bir paket içerisinde bulunan bir veri, örn bir sıcaklık verisi
const mongoose = require('mongoose');


const frDataSchema = new mongoose.Schema({
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

//the action before saving
frDataSchema.pre('save', async function(next) {
   
  });
  
//a static function for the model
frDataSchema.statics.login = async function(param1, param2) {
    console.log(this.name);
  };

const FrData = mongoose.model('fr_data', frDataSchema);

module.exports = FrData;