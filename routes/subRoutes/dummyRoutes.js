const { Router } = require('express');
const dummyController = require('../../controllers/dummyController');
const { checkUser } = require('../../middleware/authMiddleware');

const router = Router();

//dummy hardconfigi isteyecek
router.route("/dummyconfig/:apikey")
.get(dummyController.hardconfig_get);

router.route("/")
.post(checkUser,dummyController.addDummy);

router.route("/secretpage")
.get(checkUser,dummyController.secretDummy);
                                                                                            
module.exports = router;