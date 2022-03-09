const { Router } = require('express');
const embController = require('../controllers/embController');
const { checkAuth } = require('../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.get('/api/emb/hardconfig/:apikey', embController.hardconfig_get);


                                                                                                       
module.exports = router;