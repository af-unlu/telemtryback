const mongoose = require('mongoose');

const embDeviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Error Message'],
    },
    deviceId:{
        type: mongoose.Types.ObjectId, 
        ref: 'Device' ,
        required: [true, 'Error Message'],
    },
    api_key :{
        type:String,
        required: [true, 'Error Message']
    },
    log_ms:{
        type:Number,
        default: 1000,
        required: [true, 'Error Message']
    },
    uart:{ type: mongoose.Types.ObjectId, ref: 'EmbUart' },
    can:{
        count :{
            type:Number,
            required: [true, 'Error Message']
        },
        msgs:[{ type: mongoose.Types.ObjectId, ref: 'EmbCanMessage' }]
    }
});

const EmbDevice =mongoose.model('EmbDevice', embDeviceSchema);
module.exports = EmbDevice;