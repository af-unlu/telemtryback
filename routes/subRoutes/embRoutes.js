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

//Emb of specific Device of The User
router.route('/')
.get(embDeviceController.get)    //Returns That Emb if exist - no populate - done
.post(embDeviceController.create_child);   //Creates empty - emb returns ID - need to revised


router.route('/:embId')
.get(embController.get)           //Return emb object - Just Populate -done 
.patch(embController.update)      //Patch emb object                  -done
.delete(embController.delete)     //Delete - Done                     -done
.post(embController.create_child);//Create Uart Object - Done         -done


router.route('/:embId/can')
.get(embCanController.get)          //return can object - populate and select   -done    
.patch(embCanController.update)     //not allowed                               -done
.delete(embCanController.delete)     //delete                                   -done
.post(embCanController.create_child);//create can message                       -done

router.route('/:embId/can/:messageId')
.get(embCanMessageController.get)       //get that can message         -done       
.put(embCanMessageController.update)    //replace that can message     -done
.delete(embCanMessageController.delete) //delete that can message      -done 
.post(embCanMessageController.create_child);// not allowed                      -done


router.route('/:embId/uart')
.get(embUartController.get)      //return uart object        
.put(embUartController.update)   //update uart object 
.delete(embUartController.delete)//delete - empty 
.post(embUartController.create_child);//not allowed

module.exports = router;