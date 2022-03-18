const mongoose = require('mongoose');
const uiDataSchema = require("./UIData");

const uiWidgetSchema = new mongoose.Schema({
    userId:{
        type:{ type: mongoose.Types.ObjectId, ref: 'User' },
        required: [true, 'Please enter a UserId'],
    },
    uiId:{
        type:{ type: mongoose.Types.ObjectId, ref: 'UiDevice' },
        required: [true, 'Please enter a UiDeviceId'],
    },
    props: {
        type: Object,
    },
    w_type: {
        type: Number,
        required: [true, 'Error Message']
    },
    data: {
        name: {
            type: String,
            required: [true, 'Please enter a name'],
        },
        dataType: {
            type: String,
            required: [true, 'Please enter the type of data'],
        },
        stIndex: {
            type: Number,
            required: [true, 'Please enter the starting index of data']
        },
        endIndex: {
            type: Number,
            required: [true, 'Please enter the ending index of data']
        }
    },
    is_hidden: {
        type: Boolean
    },
});


module.exports = mongoose.model('UiWidget', uiWidgetSchema);