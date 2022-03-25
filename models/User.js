const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Device = require("../models/Device");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  surname: {
    type: String,
    required: [true, 'Please enter a surname'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  devices: [{ type: mongoose.Types.ObjectId, ref: 'Device' }],
},
  { timestamps: true }
);


// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
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


//#region Delete

//Deleting the User - Parent
//Also deletes Devices of the User
userSchema.statics.DeleteById = async function(userId,cb){
  Device.DeleteManyByUserId(userId,(err)=>{
    if(err){
      throw Error('Failed to delete Devices of the User');
    }else{
      this.deleteOne({"_id":userId},cb);
    }
  });
};

//Just Deleting Devices of User - Child
userSchema.statics.DeleteDevices = async function(userId,cb){
  Device.DeleteManyByUserId(userId,(err)=>{
    if(err){
      throw Error('Failed to delete Devices of the User');
    }else{
      this.updateOne({ "_id": userId},{ "$set": { devices:[]}},cb);
    }
  });
};
//#endregion

userSchema.statics.CreateNewDevice = async function(userId,newDevice,cb){
  this.updateOne({ "_id": userId },{ "$push": { devices: newDevice }},cb);
}

const User = mongoose.model('User', userSchema);

module.exports = User;