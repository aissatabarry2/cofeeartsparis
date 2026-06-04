const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const orders = req.user.role === 'admin'
      ? await Order.find().populate('user', 'name email').sort('-createdAt')
      : await Order.find({ user: req.user.id }).sort('-createdAt');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user.id });
    res.status(201).json(order);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json(order);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const revenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);
    res.json({ totalOrders, revenue: revenue[0]?.total || 0 });
  } catch (err) { res.status(500).json({ message: err.message }); }
};