const router = require('express').Router();
const { getOrders, createOrder, updateOrderStatus, getStats } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, getOrders);
router.post('/', protect, createOrder);
router.put('/:id', protect, adminOnly, updateOrderStatus);
router.get('/stats', protect, adminOnly, getStats);

module.exports = router;