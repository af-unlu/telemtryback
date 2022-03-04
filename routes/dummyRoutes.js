const { Router } = require('express');
const dummyController = require('../controllers/dummyController');
const { checkUser,requireAuth } = require('../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.get('/api/dummy/hardconfig/:apikey',checkUser, dummyController.hardconfig_get);
router.get('/api/dummy/add/',requireAuth,checkUser, dummyController.hardconfig_get);

                                                                                                       
module.exports = router;