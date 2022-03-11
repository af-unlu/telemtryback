const mongoose = require('mongoose');
const UIDevice = require("./Front/UIDevice");
const EmbDevice = require("./Embedded/EmbDevice");



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
        type:UIDevice.schema
    },
    Emb:{
        type:EmbDevice.schema
    }
});


const Device = mongoose.model('device', deviceSchema);

module.exports = Device;