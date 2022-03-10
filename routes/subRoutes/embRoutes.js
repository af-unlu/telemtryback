const { Router } = require('express');
const embController = require('../controllers/embController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.route('/hardconfig/:apikey')
.get(embController.hardconfig_get);




                                                                                                       
module.exports = router;