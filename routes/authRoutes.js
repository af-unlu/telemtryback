const { Router } = require('express');
const authController = require('../controllers/authController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('api/signup', checkUser ,authController.signup_get);
router.post('api/signup', authController.signup_post);
router.get('api/login', authController.login_get);
router.post('api/login', authController.login_post);
router.get('api/logout', authController.logout_get);
                                                                                                       
module.exports = router;