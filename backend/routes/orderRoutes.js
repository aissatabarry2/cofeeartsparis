const router = require('express').Router();
const { getOrders, createOrder, updateOrderStatus, getStats } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getStats);
router.get('/', protect, getOrders);
router.post('/', protect, createOrder);
router.put('/:id', protect, adminOnly, updateOrderStatus);


module.exports = router;