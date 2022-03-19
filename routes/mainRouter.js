const { Router } = require('express');

const authRoutes = require('./subRoutes/authRoutes');
const deviceRoutes = require('./subRoutes/deviceRoutes')
const {hardConfigGet} = require("../controllers/emb_controllers/embDeviceController")

const router = Router();


router.route('/hardconfig/:apikey')
.get(hardConfigGet);

router.use("/auth",authRoutes);
router.use("/user=:userId/device",deviceRoutes);

module.exports = router;