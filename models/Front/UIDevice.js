const mongoose = require('mongoose');
const uiWidgetSchema = require("./UIWidget");

const uiDeviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name'],
    },
    widgets:{
        type:[uiWidgetSchema]
    }
});


module.exports = uiDeviceSchema;