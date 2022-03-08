const { Router } = require('express');
const dummyController = require('../controllers/dummyController');
const { checkUser,requireAuth } = require('../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.get('/api/dummy/hardconfig/:apikey', dummyController.hardconfig_get);
router.post('/api/dummy/add/',requireAuth,checkUser, dummyController.addDummy);
router.get("/api/dummy/secretpage",requireAuth,checkUser, dummyController.secretDummy);
                                                                                                       
module.exports = router;