const { Router } = require('express');

const deviceController = require('../../controllers/deviceController');
const deviceIdController = require('../../controllers/deviceIdController');


const router = Router({mergeParams:true});

// /api/user=:userId/device
router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Device Test Route","User":req.params.userId});
});

//devices of a user
router.route('/')
.get(deviceController.get)          //get all devices - done
.put(deviceController.update)       //replace all devices
.delete(deviceController.delete)    //deletes all devices - Done
.post(deviceController.create_child);//creates device - done

router.route('/Id=:deviceId')
.get(deviceIdController.get)          //get that device - done
.put(deviceIdController.update)       //replace that device
//.patch()
.delete(deviceIdController.delete)    //deletes that device - done
.post(deviceIdController.create_child);//Not Allowed - done


router.use("/:deviceId/emb",require('./embRoutes'));
router.use("/:deviceId/ui",require('./uiRoutes'));

module.exports = router;
