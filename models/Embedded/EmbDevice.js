const mongoose = require('mongoose');

const embDeviceSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Types.ObjectId,
    ref: 'Device',
    required: [true, 'EmbDevice.deviceId'],
  },
  log_ms: {
    type: Number,
    default: 1000,
    required: [true, 'EmbDevice.log_ms']
  },
  can: {
    count: {
      type: Number,
      required: [true, 'EmbDevice.can']
    },
    messages: [{ type: mongoose.Types.ObjectId, ref: 'EmbCanMessage' }]
  },
  rs485: { type: mongoose.Types.ObjectId, ref: 'EmbRS485' },
  spi: { type: mongoose.Types.ObjectId, ref: 'EmbI2C' },
  i2c: { type: mongoose.Types.ObjectId, ref: 'EmbSPI' },

}, { versionKey: false });

embDeviceSchema.pre('remove', async function (next) {
  mongoose.model('Device').updateOne({ "_id": this.deviceId },
    { $set: { Emb: null } },
    (err) => {
      if (err) {
        throw Error('Delete : Error emptying reference');
      }
    });
    mongoose.model('EmbCanMessage').find({ "embId": this._id }, (err, doc) => {
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
  mongoose.model('EmbRS485').findOne({ "embId": this._id }, (err, doc) => {
    if (err) {
      throw Error('Find : Error Finding Child EmbRS485');
    }
    else {
      if (doc) {
        doc.remove((err) => {
          if (err) {
            throw Error('Delete : Error Delete Child EmbRS485');
          }
        })
      }
    }
  });
  mongoose.model('EmbI2C').findOne({ "embId": this._id }, (err, doc) => {
    if (err) {
      throw Error('Find : Error Finding Child EmbI2C');
    }
    else {
      if (doc) {
        doc.remove((err) => {
          if (err) {
            throw Error('Delete : Error Delete Child EmbI2C');
          }
        })
      }
    }
  });
  mongoose.model('EmbSPI').findOne({ "embId": this._id }, (err, doc) => {
    if (err) {
      throw Error('Find : Error Finding Child EmbSPI');
    }
    else {
      if (doc) {
        doc.remove((err) => {
          if (err) {
            throw Error('Delete : Error Delete Child EmbSPI');
          }
        })
      }
    }
  });
  next();
});



const EmbDevice = mongoose.model('EmbDevice', embDeviceSchema);
module.exports = EmbDevice;