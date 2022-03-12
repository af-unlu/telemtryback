const { Router } = require('express');
const Controller = require('../../controllers/embController');
const { checkUser } = require('../../middleware/authMiddleware');

const router = Router();

//Gömülü hardconfigi isteyecek
router.route('/hardconfig/:apikey')
.get(Controller.hardconfig_get);

router.route('/test')
.get(async (req, res) => {
    res.status(200).json({ "Message":"Test Route" });
});


router.use(checkUser);

//uis of an user
router.route('/user=:userId')
.get(Controller.get_all)                    
.post(Controller.create_one)
.put(Controller.update_all)
.delete(Controller.delete_all);

//specific ui of an user
router.route('/user=:userId/emb=:uiId')
.get(Controller.get_one)              
.post(async (req, res) => {
    res.status(405).json({ "Message":"Forbidden" });
})
.put(Controller.update_one)
.delete(Controller.delete_one);

module.exports = router;