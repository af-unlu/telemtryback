const { Router } = require('express');

const authRoutes = require('./subRoutes/authRoutes');
const embRoutes = require('./subRoutes/embRoutes');
const uiRoutes = require('./subRoutes/uiRoutes');

const router = Router();

router.use("/auth",authRoutes);
router.use("/emb",embRoutes);
router.use("/ui",uiRoutes);


module.exports = router;