const User = require("../models/User");
const generateApiKey = require('generate-api-key');
require('dotenv').config();

module.exports.hardconfig_get = async (req, res) => {
    res.json(req.params.apikey);
}