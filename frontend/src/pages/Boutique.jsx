import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./Boutique.css";

const API = process.env.REACT_APP_API_URL;

export default function Boutique() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    axios.get(`${API}/products`).then(res => {
      setProducts(res.data);
      setCategories(["Tous", ...new Set(res.data.map(p => p.category))]);
    });
  }, []);

  const filteredProducts = selectedCategory === "Tous"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="boutique-wrapper">
      <h1>🛍️ Boutique</h1>

      {/* Catégories */}
      <div className="categories">
        {categories.map(c => (
          <button
            key={c}
            className={c === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Liste produits */}
      <div className="products-grid">
        {filteredProducts.map(p => (
          <div key={p._id} className="product-card" onClick={() => setSelectedProduct(p)}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}€</p>
            <button onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Ajouter au panier</button>
          </div>
        ))}
      </div>

      {/* Détails produit */}
      {selectedProduct && (
        <div className="product-details">
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <p>{selectedProduct.description}</p>
          <p><strong>{selectedProduct.price}€</strong></p>
          <button onClick={() => addToCart(selectedProduct)}>Ajouter au panier</button>
          <button onClick={() => setSelectedProduct(null)}>Fermer</button>
        </div>
      )}

      {/* Panier */}
      <div className="cart">
        <h2>🛒 Panier</h2>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item._id}>
                  {item.name} — {item.price}€ ×
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  />
                  <button onClick={() => removeFromCart(item._id)}>Supprimer</button>
                </li>
              ))}
            </ul>
            <p><strong>Total : {total}€</strong></p>
            <button onClick={clearCart}>Vider le panier</button>
            <button onClick={() => alert("Simulation commande envoyée ✅")}>
              Simuler commande
            </button>
          </>
        )}
      </div>
    </div>
  );
}
