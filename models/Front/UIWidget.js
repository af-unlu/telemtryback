const mongoose = require('mongoose');
const UIData = require("./UIData");

const uiWidgetSchema = new mongoose.Schema({
    //probs yoksa default renderlasın o yüzden required değil
    props:{
        type:Object,
    },
    w_type:{
        type:number,
        required: [true, 'Error Message']
    },
    data:{
        type:UIData.schema,
        required: [true, 'Error Message']
    }

});

const UIWidget = mongoose.model('ui_widget', uiWidgetSchema);

module.exports = UIWidget;