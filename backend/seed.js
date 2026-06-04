require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Atelier = require('./models/Atelier');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await Atelier.deleteMany({});

  // Admin
  const hash = await bcrypt.hash('admin123', 10);
  await User.create({ name: 'Admin CoffeeArt', email: 'admin@coffeeart.fr', password: hash, role: 'admin' });

  // Client test
  const hashC = await bcrypt.hash('client123', 10);
  await User.create({ name: 'Client Test', email: 'client@coffeeart.fr', password: hashC, role: 'client' });

  // Produits
  await Product.insertMany([
    { name: 'Café Éthiopie Yirgacheffe', description: 'Notes florales et agrumes', price: 18, category: 'Café', stock: 50 },
    { name: 'Mug Céramique Artisanal', description: 'Fait main, unique', price: 35, category: 'Céramique', stock: 20 },
    { name: 'Chemex 6 tasses', description: 'Cafetière design', price: 65, category: 'Accessoires', stock: 10 },
    { name: 'Kit Dégustation', description: '3 cafés + guide', price: 45, category: 'Café', stock: 15 },
  ]);

  // Ateliers
  await Atelier.insertMany([
    { title: 'Initiation Latte Art', description: 'Apprenez à créer des dessins dans votre café', price: 45, date: new Date('2026-06-20'), places: 8, placesLeft: 8 },
    { title: 'Tournage Céramique', description: 'Créez votre propre mug', price: 65, date: new Date('2026-06-27'), places: 6, placesLeft: 6 },
    { title: 'Dégustation Cafés du Monde', description: 'Voyage sensoriel', price: 35, date: new Date('2026-07-05'), places: 12, placesLeft: 12 },
  ]);

  console.log('✅ Base de données initialisée !');
  console.log('Admin: admin@coffeeart.fr / admin123');
  console.log('Client: client@coffeeart.fr / client123');
  process.exit();
});