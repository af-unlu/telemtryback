const mongoose = require('mongoose');



const embDeviceSchema = new mongoose.Schema({
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


module.exports = mongoose.model('EmbDevice', embDeviceSchema);