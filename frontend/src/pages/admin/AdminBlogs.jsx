import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminBlogs.css";

const API = process.env.REACT_APP_API_URL;
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", author: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const loadBlogs = async () => {
    const res = await axios.get(`${API}/blogs`);
    setBlogs(res.data);
  };

  useEffect(() => { loadBlogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/blogs/${editingId}`, form, { headers: headers() });
    } else {
      await axios.post(`${API}/blogs`, form, { headers: headers() });
    }
    setForm({ title: "", content: "", author: "", image: "" });
    setEditingId(null);
    loadBlogs();
  };

  const handleEdit = (b) => {
    setForm(b);
    setEditingId(b._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet article ?")) {
      await axios.delete(`${API}/blogs/${id}`, { headers: headers() });
      loadBlogs();
    }
  };

  return (
    <div className="blogs-wrapper">
      <h2>📝 Gestion Blogs</h2>

      <form onSubmit={handleSubmit} className="blog-form">
        <input type="text" placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="text" placeholder="Auteur" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <textarea placeholder="Contenu" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      <table className="blogs-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{new Date(b.createdAt).toLocaleDateString("fr-FR")}</td>
              <td>
                <button onClick={() => handleEdit(b)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(b._id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
