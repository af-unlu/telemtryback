const mongoose = require('mongoose');
const generateApiKey = require('generate-api-key');

const dummySchema = new mongoose.Schema({
    name:String,
    apikey:String
});

dummySchema.pre('save', async function(next) {
    /*
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);*/
    this.apikey=generateApiKey({ method: 'string', prefix: 'DummyKey' }); // ⇨ 'test_app.aTd34Rli0nir70/8'
    next();
  });


const Dummy = mongoose.model('dummy', dummySchema);

module.exports = Dummy;