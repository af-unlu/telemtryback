const { Router } = require('express');
const authController = require('../controllers/authController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/api/emb/hardconfig/:apikey', ()=>{});
router.post('/api/emb', ()=>{});
router.get('/api/emb', ()=>{});
router.post('/api/emb', ()=>{});
router.get('/api/emb', ()=>{});
                                                                                                       
module.exports = router;