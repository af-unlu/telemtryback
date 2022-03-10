const { Router } = require('express');
const dummyController = require('../controllers/dummyController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.get('/api/dummy/hardconfig/:apikey', dummyController.hardconfig_get);
router.post('/api/dummy/add/',checkUser, dummyController.addDummy);
router.get("/api/dummy/secretpage",checkUser, dummyController.secretDummy);
                                                                                                       
module.exports = router;