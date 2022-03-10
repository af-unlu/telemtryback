const { Router } = require('express');
const authController = require('../../controllers/authController');
const { checkUser} = require('../../middleware/authMiddleware');

const router = Router();

router.get('/api/signup', checkUser ,authController.signup_get);
router.post('/api/signup', checkUser ,authController.signup_post);
router.get('/api/login', checkUser ,authController.login_get);
router.post('/api/login',checkUser ,authController.login_post);
router.get('/api/logout',checkUser ,authController.logout_get);
                                                                                                       
module.exports = router;