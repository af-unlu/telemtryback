const { Router } = require('express');
const embRoutes = require('./embRoutes');
const uiRoutes = require('./uiRoutes');
const deviceController = require('../../controllers/deviceController');

const { checkUser } = require('../../middleware/authMiddleware');

const router = Router();

router.use(checkUser);

router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Device Test Route" });
});

//devices of a user
router.route('/user=:userId')
.get(deviceController.get)          //get all devices
.put(deviceController.update)       //replace all devices
.delete(deviceController.delete)    //deletes all devices
.post(deviceController.create_child);//creates device

router.route('/user=:userId/device=:deviceId')
.get(deviceController.get)          //get that device
.put(deviceController.update)       //replace that device
.delete(deviceController.delete)    //deletes that device
.post(deviceController.create_child);//Not Allowed

router.use("/:deviceId/emb",embRoutes);
router.use("/:deviceId/ui",uiRoutes);

module.exports = router;
