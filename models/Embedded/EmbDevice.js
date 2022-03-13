const mongoose = require('mongoose');
const embCanMessageSchema = require('./EmbCan');
const embUartSchema = require('./EmbUart');


const embDeviceSchema = new mongoose.Schema({
    api_key :{
        type:String,
        required: [true, 'Error Message']
    },
    log_ms:{
        type:Number,
        required: [true, 'Error Message']
    },
    can:embCanMessageSchema,
    uart:embUartSchema
});


module.exports = embDeviceSchema;