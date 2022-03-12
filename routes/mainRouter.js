const { Router } = require('express');

const authRoutes = require('./subRoutes/authRoutes');
const embRoutes = require('./subRoutes/embRoutes');
const uiRoutes = require('./subRoutes/uiRoutes');
const dummyRoutes = require('./subRoutes/dummyRoutes');

const router = Router();

router.use("/auth",authRoutes);
router.use("/emb",embRoutes);
router.use("/ui",uiRoutes);
router.use("/dummy",dummyRoutes);


module.exports = router;