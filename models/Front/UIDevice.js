const mongoose = require('mongoose');
const UIwidget = require("./UIWidget");

const uiDeviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name'],
    },
    widgets:{
        type:[UIwidget.schema]
    }
});

const UIDevice = mongoose.model('ui_device', uiDeviceSchema);

module.exports = UIDevice;