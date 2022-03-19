const { Router } = require('express');
const { checkUser } = require('../../middleware/authMiddleware');

const embController = require('../../controllers/emb_controllers/embController');
const embCanController = require('../../controllers/emb_controllers/embCanController');
const embCanMessageController = require('../../controllers/emb_controllers/embCanMessageController');
const embUartController = require('../../controllers/emb_controllers/embUartController');
const embUartMessageController = require('../../controllers/emb_controllers/embUartMessageController');

const router = Router();


router.route('/hardconfig/:apikey')
.get(embDeviceController.hardconfig_get);

router.use(checkUser);

//Emb of specific Device of The User
router.route('/')
.get(embController.get)     //Returns That Emb if exist 
.post(embController.create_child);   //Creates empty - emb returns ID 


router.route('/emb=:embId')
.get(embDeviceController.get)       //return emb object  - populate or deep populate    
.put(embDeviceController.update)    //replace emb object 
.delete(embDeviceController.delete) //delete - emty can object
.post(embDeviceController.create_child);//create can message


router.route('/emb=:embId/can')
.get(embCanController.get)       //return can object       
.put(embCanController.update)    //replace can object 
.delete(embCanController.delete) //delete - emty can object
.post(embCanController.create_child);//create can message

router.route('/emb=:embId/can/canmessage=messageId')
.get(embCanMessageController.get)       //get that can message       
.put(embCanMessageController.update)    //replace that can message
.delete(embCanMessageController.delete) //delete that can message
.post(embCanMessageController.create_child);//not allowed


router.route('/emb=:embId/uart')
.get(embUartController.get)      //return uart object        
.put(embUartController.update)   //replace uart object
.delete(embUartController.delete)//delete - empty 
.post(embUartController.create_child);//create new message-data  

router.route('/emb=:embId/uart/data=dataId')
.get(embUartMessageController.get)     //get that message         
.put(embUartMessageController.update)  //replace that message 
.delete(embUartMessageController.delete)//delete that message - maybe we need to adjust indexses again? 
.post(embUartMessageController.create_child);//not allowed  


module.exports = router;