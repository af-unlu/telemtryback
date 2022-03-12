const mongoose = require('mongoose');
const embCanMessageSchema = require('./EmbCanMessage');

const embCanSchema = new mongoose.Schema({
    count :{
        type:Number,
        required: [true, 'Error Message']
    },
    msgs:[embCanMessageSchema]
});

module.exports = embCanSchema;