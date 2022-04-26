const mongoose = require('mongoose');


const uiWidgetSchema = new mongoose.Schema({
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
        required: [true, 'UiWidget.w_type']
    },
    data: {
        name: {
            type: String,
            required: [true, 'UiWidget.data.name'],
        },
        dataType: {
            type: String,
            required: [true, 'UiWidget.data.dataType'],
        },
        stIndex: {
            type: Number,
            required: [true, 'UiWidget.data.stIndex']
        },
        endIndex: {
            type: Number,
            required: [true, 'UiWidget.data.endIndex']
        }
    },
    is_hidden: {
        type: Boolean,
        default:true
    },
},{versionKey: false});

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