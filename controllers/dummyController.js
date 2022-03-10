const User = require("../models/User");
const Dummy = require("../models/Dummy");
const generateApiKey = require('generate-api-key');

require('dotenv').config();

module.exports.hardconfig_get = async (req, res) => {

    //returns dummy

}
const generateDummyKey = () => {
    return generateApiKey({ method: 'string', prefix: 'DummyKey', pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+' });
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

module.exports.secretDummy = async (req, res) => {
    if (res.locals.myStatus == 200) {
        if (res.locals.user) {
            res.status(201).json("Hos geldin amk");
        }
    }
    else {
        res.status(401).json({ "message": "You are not authorized" });
    }

}