const mongoose = require('mongoose');
const uiDeviceSchema = require("./Front/UIDevice");
const embDeviceSchema = require("./Embedded/EmbDevice");



const deviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name'],
    },
    props:{
        type:Object
    },
    apikey:{
        type:String,
        required: [true, 'Error Message'],
    },
    //bunların default işlemleri vardı, otomatik update vs edildiğinde kendi yazıyordu
    dateCR:{
        type:Date
    },
    dateUp:{
        type:Date
    },
    Ui:{
        type:uiDeviceSchema
    },
    Emb:{
        type:embDeviceSchema
    }
});

module.exports = deviceSchema;