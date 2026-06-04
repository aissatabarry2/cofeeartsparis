import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProducts.css";

const API = process.env.REACT_APP_API_URL;
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", stock: 0, image: "" });
  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/products/${editingId}`, form, { headers: headers() });
    } else {
      await axios.post(`${API}/products`, form, { headers: headers() });
    }
    setForm({ name: "", description: "", price: "", category: "", stock: 0, image: "" });
    setEditingId(null);
    loadProducts();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      await axios.delete(`${API}/products/${id}`, { headers: headers() });
      loadProducts();
    }
  };

  return (
    <div className="products-wrapper">
      <h2>🛍️ Gestion Produits</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="Prix (€)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="text" placeholder="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />

        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      {/* Tableau */}
      <table className="products-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}€</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(p._id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
