const { Router } = require('express');

const {hardConfigGet} = require("../controllers/emb_controllers/embDeviceController")
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.route('/hardconfig/:apikey').get(hardConfigGet);

router.use(checkUser);

router.use("/auth",require('./subRoutes/authRoutes'));
router.use("/user=:userId/device",require('./subRoutes/deviceRoutes'));

module.exports = router;