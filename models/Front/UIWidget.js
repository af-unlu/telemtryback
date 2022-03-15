const mongoose = require('mongoose');
const uiDataSchema = require("./UIData");

const uiWidgetSchema = new mongoose.Schema({
    //probs yoksa default renderlasın o yüzden required değil
    props:{
        type:Object,
    },
    w_type:{
        type:Number,
        required: [true, 'Error Message']
    },
    data:{
        type:uiDataSchema,
        required: [true, 'Error Message']
    },
    is_hidden:{
        type: Boolean
    }
});


module.exports =  mongoose.model('UiWidget', uiWidgetSchema);