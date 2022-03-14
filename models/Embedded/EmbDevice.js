const mongoose = require('mongoose');
const embCanMessageSchema = require('./EmbCanMessage');
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
    uart:embUartSchema,
    can:{
        count :{
            type:Number,
            required: [true, 'Error Message']
        },
        msgs:[embCanMessageSchema]
    }
});


module.exports = embDeviceSchema;