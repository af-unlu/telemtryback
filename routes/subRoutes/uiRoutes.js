const { Router } = require('express');

const uiController = require('../../controllers/ui_controllers/uiController');
const uiPageController = require('../../controllers/ui_controllers/uiPageController');
const uiWidgetController = require('../../controllers/ui_controllers/uiWidgetController');

// /api/user=:userId/device/ui
// Params : deviceId & userId

const router = Router({mergeParams:true});

router.route('/')
.get(uiController.get)//get the page if exist 
.post(uiController.create_child);//Create The Empty Page & Return ID

//specific ui of an user
router.route('/:uiId')
.get(uiPageController.get)           //gets that page - Populate Widgets          
.put(uiPageController.update)        //Not Allowed
.delete(uiPageController.delete)     //deletes that page -
.post(uiPageController.create_child);//creates a child inside a page

//widget of a specific page
router.route('/:uiId/:widgetId')
.get(uiWidgetController.get)           //gets that widget             
.put(uiWidgetController.update)        //replaces that widget
.delete(uiWidgetController.delete)     //deletes that widget
.post(uiWidgetController.create_child);//not allowed, impossible

module.exports = router;
