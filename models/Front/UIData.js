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

//the action before saving
uiDataSchema.pre('save', async function(next) {
   
  });
  
//a static function for the model
uiDataSchema.statics.login = async function(param1, param2) {
    console.log(this.name);
};

const UIData = mongoose.model('ui_data', uiDataSchema);

module.exports = UIData;