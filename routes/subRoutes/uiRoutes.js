const { Router } = require('express');

const uiController = require('../../controllers/ui_controllers/uiController');
const uiPageController = require('../../controllers/ui_controllers/uiPageController');
const uiWidgetController = require('../../controllers/ui_controllers/uiWidgetController');


const { checkUser } = require('../../middleware/authMiddleware');

const router = Router();

router.use(checkUser);

router.route('/')
.get(uiController.get)//get the page if exist 
.post(uiController.create_child);//Create The Empty Page & Return ID

//specific ui of an user
router.route('/ui=:uiId')
.get(uiPageController.get)           //gets that page - Populate Widgets          
.put(uiPageController.update)        //replaces that page -
.delete(uiPageController.delete)     //deletes that page -
.post(uiPageController.create_child);//creates a child inside a page

//widget of a specific page
router.route('/ui=:uiId/widget=:widgetId')
.get(uiWidgetController.get)           //gets that widget             
.put(uiWidgetController.update)        //replaces that widget
.delete(uiWidgetController.delete)     //deletes that widget
.post(uiWidgetController.create_child);//not allowed, impossible

module.exports = router;
