const Atelier = require('../models/Atelier');

exports.getAll = async (req, res) => {
  try { res.json(await Atelier.find().sort('date')); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const atelier = await Atelier.create({ ...req.body, placesLeft: req.body.places });
    res.status(201).json(atelier);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const atelier = await Atelier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atelier) return res.status(404).json({ message: 'Atelier non trouvé' });
    res.json(atelier);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await Atelier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Atelier supprimé' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};