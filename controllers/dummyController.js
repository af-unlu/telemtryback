const User = require("../models/User");
const Dummy = require("../models/Dummy");
const generateApiKey = require('generate-api-key');

require('dotenv').config();

module.exports.hardconfig_get = async (req, res) => {
    let name = null;
    User.findOne({"dummies.apikey":req.params.apikey},{"dummies.$": 1, "_id": 0},(err,found)=>{
        if(err){console.log("You Suck")}
        else{
            name = found.dummies[0].name;
        }
    });

    if(name){
        res.status(200).json({ "name": name});
    }
    else{
        res.status(404).json({ "message": "Dummy Not Found"});
    }
}

module.exports.addDummy=async (req, res) => {
    


}