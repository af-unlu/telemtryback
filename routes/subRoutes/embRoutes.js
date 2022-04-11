const { Router } = require('express');

const embDeviceController = require('../../controllers/emb_controllers/embDeviceController');
const embController = require('../../controllers/emb_controllers/embController');

const embCanController = require('../../controllers/emb_controllers/embCanController');
const embCanMessageController = require('../../controllers/emb_controllers/embCanMessageController');

const embRS485Controller = require('../../controllers/emb_controllers/embRS485Controller');
const embSPIController = require('../../controllers/emb_controllers/embSPIController');
const embI2CController = require('../../controllers/emb_controllers/embI2CController');

const router = Router({mergeParams:true});

// /api/user=:userId/device/emb
// Params : deviceId & userId

//Emb of specific Device of The User
router.route('/')
.get(embDeviceController.get)    //Returns That Emb if exist
.post(embDeviceController.create_child);   //Creates empty emb

router.route('/:embId')
.get(embController.get)           //Return emb object - populated : replace IDs with object
.put(embController.update)      //Patch emb object                 
.delete(embController.delete)     //Delete                
.post(embController.create_child);// not allowed

router.route('/:embId/rs485')
.post(embRS485Controller.create_child)  //create a rs485 object to that emb
.get(embRS485Controller.get)            //return rs485 object    
.put(embRS485Controller.update)         //replace rs485 object     
.delete(embRS485Controller.delete);     //delete rs485 object

router.route('/:embId/spi')
.post(embSPIController.create_child)  //create a spi object to that emb
.get(embSPIController.get)            //return spi object    
.put(embSPIController.update)         //replace spi object     
.delete(embSPIController.delete);     //delete spi object

router.route('/:embId/i2c')
.post(embI2CController.create_child)  //create a i2c object to that emb
.get(embI2CController.get)            //return i2c object    
.put(embI2CController.update)         //replace i2c object     
.delete(embI2CController.delete);     //delete i2c object

router.route('/:embId/can')
.get(embCanController.get)           //return can object - populate and select      
.put(embCanController.update)        //not allowed                              
.delete(embCanController.delete)     //delete                                  
.post(embCanController.create_child);//create can message                      

router.route('/:embId/can/:messageId')
.get(embCanMessageController.get)       //get that can message 
.put(embCanMessageController.update)    //replace that can message   
.delete(embCanMessageController.delete) //delete that can message    
.post(embCanMessageController.create_child);// not allowed           

module.exports = router;