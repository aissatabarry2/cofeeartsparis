const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

// app.use(cors({
//   origin: "https://cofeeartsparis-front.vercel.app", // ton frontend déployé
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur port ${PORT}`));