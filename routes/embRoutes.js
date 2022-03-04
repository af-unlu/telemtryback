const { Router } = require('express');
const embController = require('../controllers/embController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/api/emb/hardconfig/:apikey', embController.hardconfig_get);

                                                                                                       
module.exports = router;