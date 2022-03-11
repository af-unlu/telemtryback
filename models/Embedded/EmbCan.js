const mongoose = require('mongoose');
const EmbCanMessage = require('./EmbCanMessage');

const embCanSchema = new mongoose.Schema({
    count :{
        type:Number,
        required: [true, 'Error Message']
    },
    msgs:[EmbCanMessage.schema]
});

const EmbCan = mongoose.model('emb_can', embCanSchema);

module.exports = EmbCan;