const mongoose = require('mongoose');


const uiWidgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Error Message'],
    },
    deviceId:{
        type: mongoose.Types.ObjectId, 
        ref: 'Device' ,
        required: [true, 'Error Message'],
    },
    uiId: {
        type: mongoose.Types.ObjectId,
        ref: 'UiDevice',
        required: [true, 'Please enter a UiDeviceId']
    },
    props: {
        type: Object,
    },
    w_type: {
        type: Number,
        required: [true, 'Error Message']
    },
    data: {
        name: {
            type: String,
            required: [true, 'Please enter a name'],
        },
        dataType: {
            type: String,
            required: [true, 'Please enter the type of data'],
        },
        stIndex: {
            type: Number,
            required: [true, 'Please enter the starting index of data']
        },
        endIndex: {
            type: Number,
            required: [true, 'Please enter the ending index of data']
        }
    },
    is_hidden: {
        type: Boolean,
        default:true
    },
});

//pre delete 
uiWidgetSchema.pre('remove',async function (next) {
    mongoose.model('UiDevice').updateOne({"_id":this.uiId},
    {$pull:{widgets:this._id}},
      (err)=>{
        if(err){
          throw Error('Delete : Error emptying reference');
        }
      });  
      next();
    });

const UiWidget = mongoose.model('UiWidget', uiWidgetSchema);
module.exports = UiWidget;