const { Router } = require('express');

const deviceController = require('../../controllers/deviceController');
const deviceIdController = require('../../controllers/deviceIdController');


const router = Router({mergeParams:true});

//devices of a user
router.route('/')
.get(deviceController.get)          //get all devices
.delete(deviceController.delete)    //deletes all devices
.post(deviceController.create_child);//creates device

router.route('/:deviceId')
.get(deviceIdController.get)          //get that device
.patch(deviceIdController.update)      //Patch that device
.delete(deviceIdController.delete)    //deletes that device
.post(deviceIdController.create_child);//Not Allowed


router.use("/:deviceId/emb",require('./embRoutes'));
router.use("/:deviceId/ui",require('./uiRoutes'));

module.exports = router;
