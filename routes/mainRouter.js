const { Router } = require('express');

const authRoutes = require('./subRoutes/authRoutes');
const deviceRoutes = require('./subRoutes/deviceRoutes')


const router = Router();

router.use("/auth",authRoutes);
router.use("/user=:userId/device",deviceRoutes);
/*
router.route('/hardconfig/:apikey')
.get();*/



module.exports = router;