const mongoose = require('mongoose');

const embDeviceSchema = new mongoose.Schema({
    userId:{
        type:{ type: mongoose.Types.ObjectId, ref: 'User' },
        required: [true, 'Please enter a UserId'],
    },
    deviceId:{
        type:{ type: mongoose.Types.ObjectId, ref: 'Device' }
    },
    api_key :{
        type:String,
        required: [true, 'Error Message']
    },
    log_ms:{
        type:Number,
        required: [true, 'Error Message']
    },
    uart:{ type: mongoose.Types.ObjectId, ref: 'EmbUart' },
    can:{
        count :{
            type:Number,
            required: [true, 'Error Message']
        },
        msgs:[{ type: mongoose.Types.ObjectId, ref: 'EmbCan' }]
    }
});

const EmbDevice =mongoose.model('EmbDevice', embDeviceSchema);
module.exports = EmbDevice;