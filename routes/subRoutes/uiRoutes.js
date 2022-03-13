const { Router } = require('express');

const uiController = require('../../controllers/ui_controllers/uiController');
const uiPageController = require('../../controllers/ui_controllers/uiPageController');
const uiWidgetController = require('../../controllers/ui_controllers/uiWidgetController');


const { checkUser } = require('../../middleware/authMiddleware');

const router = Router();

router.use(checkUser);

router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Ui Test Route" });
});

//uis of an user
router.route('/user=:userId')
.get(uiController.get)          //get all pages
.put(uiController.update)       //replace all pages
.delete(uiController.delete)    //deletes all pages
.post(uiController.create_child);//creates new page

//specific ui of an user
router.route('/user=:userId/ui=:uiId')
.get(uiPageController.get)           //gets that page           
.put(uiPageController.update)        //replaces that page
.delete(uiPageController.delete)     //deletes that page
.post(uiPageController.create_child);//creates a child inside a page

//widget of a specific page
router.route('/user=:userId/ui=:uiId/widget=:widgetId')
.get(uiWidgetController.get)           //gets that widget             
.put(uiWidgetController.update)        //replaces that widget
.delete(uiWidgetController.delete)     //deletes that widget
.post(uiWidgetController.create_child);//not allowed, impossible

module.exports = router;
