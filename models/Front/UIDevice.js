const mongoose = require('mongoose');

const uiDeviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name'],
    },
    widgets:{
        type:[{ type: mongoose.Types.ObjectId, ref: 'UiWidget' }]
    }
});


module.exports = mongoose.model('UiDevice', uiDeviceSchema);;