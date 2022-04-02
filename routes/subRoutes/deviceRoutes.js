const { Router } = require('express');

const deviceController = require('../../controllers/deviceController');
const deviceIdController = require('../../controllers/deviceIdController');


const router = Router({mergeParams:true});

//devices of a user
router.route('/')
.get(deviceController.get)          //get all devices - done
.delete(deviceController.delete)    //deletes all devices - done
.post(deviceController.create_child);//creates device - done

router.route('/:deviceId')
.get(deviceIdController.get)          //get that device - done
.patch(deviceIdController.update)      //Patch that device -done
.delete(deviceIdController.delete)    //deletes that device - done
.post(deviceIdController.create_child);//Not Allowed - done


router.use("/:deviceId/emb",require('./embRoutes'));
router.use("/:deviceId/ui",require('./uiRoutes'));

module.exports = router;
