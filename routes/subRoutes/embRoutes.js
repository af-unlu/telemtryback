const { Router } = require('express');
const embController = require('../../controllers/emb_controllers/embController');
const embDeviceController = require('../../controllers/emb_controllers/embDeviceController');
const embCanController = require('../../controllers/emb_controllers/embCanController');
const embCanMessageController = require('../../controllers/emb_controllers/embCanMessageController');
const embUartController = require('../../controllers/emb_controllers/embUartController');
const embUartMessageController = require('../../controllers/emb_controllers/embUartMessageController');
const { checkUser } = require('../../middleware/authMiddleware');

const router = Router();


router.route('/hardconfig/:apikey')
.get(embDeviceController.hardconfig_get);

router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Test Route" });
});


router.use(checkUser);

//embs of an user
router.route('/user=:userId')
.get(embController.get)       //gets all embs      
.put(embController.update)    //replaces all embs  
.patch(embController.patch)   //replaces only one prop
.delete(embController.delete) //deletes all embs
.post(embController.create_child);  //creates one emb

//specific emb of an user
router.route('/user=:userId/emb=:embId')
.get(embDeviceController.get)       //get that emb       
.put(embDeviceController.update)    //replace that emb
.delete(embDeviceController.delete) //delete that emb
.post(embDeviceController.create_child);//because there is 2 childs and these childs are not array its not allowed

router.route('/user=:userId/emb=:embId/can')
.get(embCanController.get)       //return can object       
.put(embCanController.update)    //replace can object 
.delete(embCanController.delete) //delete - emty can object
.post(embCanController.create_child);//create can message

router.route('/user=:userId/emb=:embId/can/canmessage=messageId')
.get(embCanMessageController.get)       //get that can message       
.put(embCanMessageController.update)    //replace that can message
.delete(embCanMessageController.delete) //delete that can message
.post(embCanMessageController.create_child);//not allowed


router.route('/user=:userId/emb=:embId/uart')
.get(embUartController.get)      //return uart object        
.put(embUartController.update)   //replace uart object
.delete(embUartController.delete)//delete - empty 
.post(embUartController.create_child);//create new message-data  

router.route('/user=:userId/emb=:embId/uart/data=dataId')
.get(embUartMessageController.get)     //get that message         
.put(embUartMessageController.update)  //replace that message 
.delete(embUartMessageController.delete)//delete that message - maybe we need to adjust indexses again? 
.post(embUartMessageController.create_child);//not allowed  


module.exports = router;