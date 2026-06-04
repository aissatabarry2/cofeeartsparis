const Contact = require('../models/Contact');

exports.sendMessage = async (req, res) => {
  try {
    const msg = await Contact.create(req.body);
    res.status(201).json({ message: 'Message envoyé avec succès' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getAllMessages = async (req, res) => {
  try { res.json(await Contact.find().sort('-createdAt')); }
  catch (err) { res.status(500).json({ message: err.message }); }
};