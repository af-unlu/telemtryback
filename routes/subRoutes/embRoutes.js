const { Router } = require('express');

const embDeviceController = require('../../controllers/emb_controllers/embDeviceController');
const embController = require('../../controllers/emb_controllers/embController');
const embCanController = require('../../controllers/emb_controllers/embCanController');
const embCanMessageController = require('../../controllers/emb_controllers/embCanMessageController');
const embUartController = require('../../controllers/emb_controllers/embUartController');
const embUartMessageController = require('../../controllers/emb_controllers/embUartMessageController');

const router = Router({mergeParams:true});

// /api/user=:userId/device/emb
// Params : deviceId & userId

router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Emb Test Route",
    "User":req.params.userId,
    "Device":req.params.deviceId});
});



//Emb of specific Device of The User
router.route('/')
.get(embDeviceController.get)    //Returns That Emb if exist - no populate - done
.post(embDeviceController.create_child);   //Creates empty - emb returns ID - need to revised


router.route('/Id=:embId')
.get(embController.get)           //return emb object  - populate 
.put(embController.update)        //replace emb object 
.delete(embController.delete)     //delete
.post(embController.create_child);//Not Allowed - child created at can or uart endpoints


router.route('/:embId/can')
.get(embCanController.get)       //return can object       
.put(embCanController.update)    //replace can object 
//.patch()
.delete(embCanController.delete) //delete - emty can object
.post(embCanController.create_child);//create can message

router.route('/:embId/can/msg=:messageId')
.get(embCanMessageController.get)       //get that can message       
.put(embCanMessageController.update)    //replace that can message
//.patch()
.delete(embCanMessageController.delete) //delete that can message
.post(embCanMessageController.create_child);//not allowed


router.route('/:embId/uart')
.get(embUartController.get)      //return uart object        
.put(embUartController.update)   //replace uart object
//.patch()
.delete(embUartController.delete)//delete - empty 
.post(embUartController.create_child);//create new message-data  

router.route('/:embId/uart/data=:dataId')
.get(embUartMessageController.get)     //get that message         
.put(embUartMessageController.update)  //replace that message 
.delete(embUartMessageController.delete)//delete that message - maybe we need to adjust indexses again? 
.post(embUartMessageController.create_child);//not allowed  


module.exports = router;