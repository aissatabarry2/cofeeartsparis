import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAteliers.css";

const API = process.env.REACT_APP_API_URL;
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function AdminAteliers() {
  const [ateliers, setAteliers] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", date: "", places: 0 });
  const [editingId, setEditingId] = useState(null);

  const loadAteliers = async () => {
    const res = await axios.get(`${API}/ateliers`);
    setAteliers(res.data);
  };

  useEffect(() => {
    loadAteliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/ateliers/${editingId}`, form, { headers: headers() });
    } else {
      await axios.post(`${API}/ateliers`, form, { headers: headers() });
    }
    setForm({ title: "", description: "", price: "", date: "", places: 0 });
    setEditingId(null);
    loadAteliers();
  };

  const handleEdit = (a) => {
    setForm({ ...a, date: a.date.slice(0, 10) }); // format YYYY-MM-DD
    setEditingId(a._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet atelier ?")) {
      await axios.delete(`${API}/ateliers/${id}`, { headers: headers() });
      loadAteliers();
    }
  };

  return (
    <div className="ateliers-wrapper">
      <h2>📅 Gestion Ateliers</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="atelier-form">
        <input type="text" placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="Prix (€)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input type="number" placeholder="Places" value={form.places} onChange={(e) => setForm({ ...form, places: e.target.value })} required />

        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      {/* Tableau */}
      <table className="ateliers-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Prix</th>
            <th>Date</th>
            <th>Places</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ateliers.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.price}€</td>
              <td>{new Date(a.date).toLocaleDateString("fr-FR")}</td>
              <td>{a.places}</td>
              <td>
                <button onClick={() => handleEdit(a)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(a._id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
