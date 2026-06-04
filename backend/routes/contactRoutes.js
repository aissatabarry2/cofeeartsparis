const router = require('express').Router();
const { sendMessage, getAllMessages } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', sendMessage);
router.get('/', protect, adminOnly, getAllMessages);



module.exports = router;