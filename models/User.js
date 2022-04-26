const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Device = require("../models/Device");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User.name'],
  },
  surname: {
    type: String,
    required: [true, 'User.surname'],
  },
  email: {
    type: String,
    required: [true, 'User.email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'User.isEmail.Not']
  },
  password: {
    type: String,
    required: [true, 'User.password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  devices: [{ type: mongoose.Types.ObjectId, ref: 'Device' }],
},
  { timestamps: true ,versionKey: false}
);


// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('remove',async function (next) {
  Device.find({"userId":this._id},(err,found)=>{
    if(err){
      throw Error('Delete : Error finding devices of the user');
    }
    else{
      if(found){
        found.forEach((item)=>{
          item.remove();
        })
      }
    }
  })
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};


userSchema.statics.CreateNewDevice = async function(userId,newDevice,cb){
  this.updateOne({ "_id": userId },{ "$push": { devices: newDevice }},cb);
}

const User = mongoose.model('User', userSchema);

module.exports = User;