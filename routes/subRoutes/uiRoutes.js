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
.get(Controller.get_all)                     
.post(Controller.create_one)
.put(Controller.update_all)
.delete(Controller.delete_all);

//specific ui of an user
router.route('/user=:userId/ui=:uiId')
.get(Controller.get_one)              
.post(async (req, res) => {
    res.status(405).json({ "Message":"Forbidden" });
})
.put(Controller.update_one)
.delete(Controller.delete_one);

module.exports = router;