const { Router } = require('express');
const embController = require('../controllers/embController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.route('/api/emb/hardconfig/:apikey')
.get(embController.hardconfig_get)
.post(checkUser,async (req, res) => {
    res.status(200).json({ "ApiKey":req.params.apikey });
});


                                                                                                       
module.exports = router;