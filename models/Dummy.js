const mongoose = require('mongoose');


const dummySchema = new mongoose.Schema({
    name:String,
    apikey:String
});



const Dummy = mongoose.model('dummy', dummySchema);

module.exports = Dummy;