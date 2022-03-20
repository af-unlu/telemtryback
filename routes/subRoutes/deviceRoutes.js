const { Router } = require('express');

const embRoutes = require('./embRoutes');
const uiRoutes = require('./uiRoutes');

const deviceController = require('../../controllers/deviceController');
const deviceIdController = require('../../controllers/deviceIdController');


const router = Router({mergeParams:true});


router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Device Test Route","User":req.params.userId});
});

//devices of a user
router.route('/')
.get(deviceController.get)          //get all devices
.put(deviceController.update)       //replace all devices
.delete(deviceController.delete)    //deletes all devices
.post(deviceController.create_child);//creates device

router.route('/Id=:deviceId')
.get(deviceIdController.get)          //get that device
.put(deviceIdController.update)       //replace that device
.delete(deviceIdController.delete)    //deletes that device
.post(deviceIdController.create_child);//Not Allowed

router.use("/:deviceId/emb",embRoutes);
router.use("/:deviceId/ui",uiRoutes);

module.exports = router;
