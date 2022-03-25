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
    Ui: {
        type: { type: mongoose.Types.ObjectId, ref: 'UiDevice' }
    },
    Emb: {
        type: { type: mongoose.Types.ObjectId, ref: 'EmbDevice' }
    },
},
{ timestamps: true });


//Add Ui
//Add Emb
//What to Do when Delete

deviceSchema.statics.DeleteManyByUserId = async function(userId,cb){
    //delete embs and uis here
    this.deleteMany({"userId":userId},cb);
};

deviceSchema.statics.DeleteDevice = async function(deviceId,cb){
    //delete embs and uis here
    this.deleteOne({"_id":deviceId},cb);
};


const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;