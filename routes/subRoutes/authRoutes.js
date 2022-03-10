const { Router } = require('express');
const authController = require('../../controllers/authController');
const { checkUser} = require('../../middleware/authMiddleware');

const router = Router();

//#region middleWares
router.use(checkUser);


//#endregion

router.route('/signup')
.get(authController.signup_get)
.post(authController.signup_post);

router.route('/login')
.get(authController.login_get)
.post(authController.login_post);

router.route('/logout')
.get(authController.logout_get);

module.exports = router;