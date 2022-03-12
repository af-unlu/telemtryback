const mongoose = require('mongoose');


const dummySchema = new mongoose.Schema({
    name:String,
    apikey:String
});

module.exports = dummySchema;