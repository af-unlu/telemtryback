const mongoose = require('mongoose');

const EmbCanMessage = require("./EmbCanMessage");
const EmbSerial = require("./EmbSerial");

const embDeviceSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Types.ObjectId,
    ref: 'Device',
    required: [true, 'Error Message'],
  },
  log_ms: {
    type: Number,
    default: 1000,
    required: [true, 'Error Message']
  },
  api_key: {
    type: String,
    required: [true, 'Error Message']
  },
  can: {
    count: {
      type: Number,
      required: [true, 'Error Message']
    },
    messages: [{ type: mongoose.Types.ObjectId, ref: 'EmbCanMessage' }]
  },
  rs485: { type: mongoose.Types.ObjectId, ref: 'EmbSerial' },
  spi: { type: mongoose.Types.ObjectId, ref: 'EmbSerial' },
  i2c: { type: mongoose.Types.ObjectId, ref: 'EmbSerial' },

}, { versionKey: false });

embDeviceSchema.pre('remove', async function (next) {
  mongoose.model('Device').updateOne({ "_id": this.deviceId },
    { $set: { Emb: null } },
    (err) => {
      if (err) {
        throw Error('Delete : Error emptying reference');
      }
    });
  EmbCanMessage.find({ "embId": this._id }, (err, doc) => {
    if (err) {
      throw Error('Find : Error Finding Child EmbCanMessage');
    }
    else {
      if (doc) {
        doc.forEach(element => {
          element.remove((err) => {
            if (err) {
              throw Error('Delete : Error Delete Child EmbCanMessage');
            }
          })
        });
      }
    }
  });
  EmbUart.findOne({ "embId": this._id }, (err, doc) => {
    if (err) {
      throw Error('Find : Error Finding Child EmbUart');
    }
    else {
      if (doc) {
        doc.remove((err) => {
          if (err) {
            throw Error('Delete : Error Delete Child EmbUart');
          }
        })
      }
    }
  });
  next();
});



const EmbDevice = mongoose.model('EmbDevice', embDeviceSchema);
module.exports = EmbDevice;