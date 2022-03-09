const { Router } = require('express');
const authController = require('../controllers/authController');
const { checkAuth} = require('../middleware/authMiddleware');

const router = Router();

router.get('/api/signup', checkAuth ,authController.signup_get);
router.post('/api/signup', checkAuth ,authController.signup_post);
router.get('/api/login', checkAuth ,authController.login_get);
router.post('/api/login',checkAuth ,authController.login_post);
router.get('/api/logout',checkAuth ,authController.logout_get);
                                                                                                       
module.exports = router;