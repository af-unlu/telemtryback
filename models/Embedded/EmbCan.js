const mongoose = require('mongoose');
const EmbCanMessage = require('./EmbCanMessage');

const embCanSchema = new mongoose.Schema({
    count :{
        type:Number,
        required: [true, 'Error Message']
    },
    msgs:[EmbCanMessage]
});

embCanSchema.pre('save', async function(next) {
   
});

//a static function for the model
embCanSchema.statics.login = async function(param1, param2) {
 
};

const EmbCan = mongoose.model('emb_can', embCanSchema);

module.exports = EmbCan;