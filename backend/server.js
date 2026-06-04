const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();

// ✅ CORS : autorise ton frontend déployé
app.use(cors({
  origin: "https://cofeeartsparis-front.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/ateliers", require("./routes/atelierRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

// ✅ Test route
app.get("/", (req, res) => res.json({ message: "CoffeeArt API running ✅" }));

// ❌ Supprime app.listen() — Vercel gère le port automatiquement
// ✅ Exporte l’app pour la fonction Serverless
module.exports = app;
