const mongoose = require('mongoose');
const EmbUart = require('./EmbUart');
const EmbCan = require('./EmbCan');

const embDeviceSchema = new mongoose.Schema({
    api_key :{
        type:String,
        required: [true, 'Error Message']
    },
    log_ms:{
        type:Number,
        required: [true, 'Error Message']
    },
    can:[EmbCan.schema],
    uart:[EmbUart.schema]
});

const EmbDevice = mongoose.model('emb_device', embDeviceSchema);

module.exports = EmbDevice;