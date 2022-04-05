const { Router } = require('express');

const deviceController = require('../../controllers/deviceController');
const deviceIdController = require('../../controllers/deviceIdController');


const router = Router({mergeParams:true});

//devices of a user
router.route('/')
.get(deviceController.get)          //get all devices - done - tested
.delete(deviceController.delete)    //deletes all devices - done -tested
.post(deviceController.create_child);//creates device - done -tested

router.route('/:deviceId')
.get(deviceIdController.get)          //get that device - done -tested
.patch(deviceIdController.update)      //Patch that device -done -tested
.delete(deviceIdController.delete)    //deletes that device - done -tested
.post(deviceIdController.create_child);//Not Allowed - done


router.use("/:deviceId/emb",require('./embRoutes'));
router.use("/:deviceId/ui",require('./uiRoutes'));

module.exports = router;
