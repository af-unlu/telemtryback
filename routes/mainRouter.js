const { Router } = require('express');

const authRoutes = require('./subRoutes/authRoutes');
const embRoutes = require('./subRoutes/embRoutes');
const dummyRoutes = require('./subRoutes/dummyRoutes');

const router = Router();

router.use("/auth",authRoutes);
router.use("/emb",embRoutes);
router.use("/dummy",dummyRoutes);

module.exports = router;