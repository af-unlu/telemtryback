const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Error Message'],
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    props: {
        type: Object
    },
    apikey: {
        type: String,
        required: [true, 'Error Message'],
    },
    //bunların default işlemleri vardı, otomatik update vs edildiğinde kendi yazıyordu
    dateCR: {
        type: Date
    },
    dateUp: {
        type: Date
    },
    Ui: {
        type: { type: mongoose.Types.ObjectId, ref: 'UiDevice' }
    },
    Emb: {
        type: { type: mongoose.Types.ObjectId, ref: 'EmbDevice' }
    }
});

const Device = mongoose.model('Device', deviceSchema);;
module.exports = Device;