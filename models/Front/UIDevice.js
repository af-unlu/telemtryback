const mongoose = require('mongoose');

const uiDeviceSchema = new mongoose.Schema({
    userId:{
        type:{ type: mongoose.Types.ObjectId, ref: 'User' },
        required: [true, 'Please enter a UserId'],
    },
    deviceId:{
        type:{ type: mongoose.Types.ObjectId, ref: 'Device' }
    },
    name:{
        type: String,
        required: [true, 'Please enter a name'],
    },
    widgets:{
        type:[{ type: mongoose.Types.ObjectId, ref: 'UiWidget' }]
    }
});


module.exports = mongoose.model('UiDevice', uiDeviceSchema);;