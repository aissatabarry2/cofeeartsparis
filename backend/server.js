const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({
  origin: [
    'http://localhost:3000',                          // développement local
    'https://coffeeart-frontend.vercel.app',         // à mettre à jour après déploiement
    'https://cofeeartsparis-front.vercel.app'        // alternative si déjà déployé
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));
app.use('/api/ateliers', require('./routes/atelierRoutes'));
app.use('/api/contact',  require('./routes/contactRoutes'));
app.use('/api/users',    require('./routes/userRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));



app.get('/', (req, res) => res.json({ message: 'CoffeeArt API running ✅' }));

// Health check pour Vercel
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Export pour Vercel serverless + écoute pour développement local
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Serveur port ${PORT}`));
}

module.exports = app;