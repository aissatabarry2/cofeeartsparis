const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Génération du token JWT
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// ✅ Inscription
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifie si l’email existe déjà
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email déjà utilisé" });

    // Hash du mot de passe
    const hash = await bcrypt.hash(password, 10);

    // Création utilisateur (par défaut rôle client)
    const user = await User.create({
      name,
      email,
      password: hash,
      role: "client"
    });

    // Génère token
    const token = generateToken(user);

    res.status(201).json({
      message: "Compte créé avec succès",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie si l’utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur introuvable" });

    // Vérifie mot de passe
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Mot de passe incorrect" });

    // Génère token
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Récupération du profil utilisateur
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
