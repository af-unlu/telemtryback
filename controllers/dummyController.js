const User = require("../models/User");
const Dummy = require("../models/Dummy");
const generateApiKey = require('generate-api-key');

require('dotenv').config();

module.exports.hardconfig_get = async (req, res) => {
    User.findOne({ "dummies.apikey": req.params.apikey }, { "dummies.$": 1, "_id": 0 }, (err, found) => {
        if (err) { 
            res.status(400).json({"Message":"Error"});
         }
        else {
            const name = found.dummies[0].name.toString();
            if(name){
                res.status(200).json({ "name": name });
            }else{
                res.status(404).json({ "message": "Dummy Not Found" });
            }
        }
    });
}
const generateDummyKey = ()=>{
    return generateApiKey({ method: 'string', prefix: 'DummyKey', pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+'});
}
module.exports.addDummy = async (req, res) => {
    const { name } = req.body;
    if (res.locals.myStatus == 200) {
        if (res.locals.user) {
            User.updateOne({ "_id": res.locals.user._id.toString() },
                {
                    "$push": {
                        "dummies": {
                            "name": name,
                            "apikey": generateDummyKey()
                        }
                    }
                }, (err) => {
                    if (err) {
                        res.status(400).json({ "message": "You suck!" });
                    }
                    else {
                        res.status(201).json({ "message": "Dummy Created" });
                    }
                });
        }
    }
    else {
        res.json({ "message": "You are not authorized" });
    }

}