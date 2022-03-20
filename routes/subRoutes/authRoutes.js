const { Router } = require('express');
const authController = require('../../controllers/authController');

const router = Router({mergeParams:true});

//#region middleWares

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