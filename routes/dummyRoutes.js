const { Router } = require('express');
const dummyController = require('../controllers/dummyController');
const { checkAuth } = require('../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.get('/api/dummy/hardconfig/:apikey', dummyController.hardconfig_get);
router.post('/api/dummy/add/',checkAuth, dummyController.addDummy);
router.get("/api/dummy/secretpage",checkAuth, dummyController.secretDummy);
                                                                                                       
module.exports = router;