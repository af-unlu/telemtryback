const { Router } = require('express');
const Controller = require('../../controllers/uiController');
const { checkUser } = require('../../middleware/authMiddleware');

const router = Router();

router.use(checkUser);

router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Ui Test Route" });
});

//uis of an user
router.route('/user=:userId')
//gets all of them R
.get(Controller.get_all)              
//Add a new one C        
.post(Controller.create_one)
//bulk update  U
.put(Controller.update_all)
//Delete all D
.delete(Controller.delete_all);

//specific ui of an user
router.route('/user=:userId/ui=:uiId')
//gets one
.get(Controller.get_one)              
//not allowed 405 
.post(async (req, res) => {
    res.status(405).json({ "Message":"Forbidden" });
})
//updates it
.put(Controller.update_one)
//deletes
.delete(Controller.delete_one);

module.exports = router;