const { Router } = require('express');

const embDeviceController = require('../../controllers/emb_controllers/embDeviceController');
const embController = require('../../controllers/emb_controllers/embController');
const embCanController = require('../../controllers/emb_controllers/embCanController');
const embCanMessageController = require('../../controllers/emb_controllers/embCanMessageController');
const embSerialController = require('../../controllers/emb_controllers/embSerialController');

const router = Router({mergeParams:true});

// /api/user=:userId/device/emb
// Params : deviceId & userId

//Emb of specific Device of The User
router.route('/')
.get(embDeviceController.get)    //Returns That Emb if exist
.post(embDeviceController.create_child);   //Creates empty 


router.route('/:embId')
.get(embController.get)           //Return emb object - Just Populate
.put(embController.update)      //Patch emb object                 
.delete(embController.delete)     //Delete                
.post(embController.create_child);// not allowed


router.route('/:embId/can')
.get(embCanController.get)          //return can object - populate and select      
.put(embCanController.update)     //not allowed                              
.delete(embCanController.delete)     //delete                                  
.post(embCanController.create_child);//create can message                      

router.route('/:embId/can/:messageId')
.get(embCanMessageController.get)       //get that can message 
.put(embCanMessageController.update)    //replace that can message   
.delete(embCanMessageController.delete) //delete that can message    
.post(embCanMessageController.create_child);// not allowed           

router.route('/:embId/serial')
.get(embSerialController.get)            //return serial object     
.put(embSerialController.update)         //update serial object     
.delete(embSerialController.delete)      //delete - empty
.post(embSerialController.create_child); //c not allowed



module.exports = router;