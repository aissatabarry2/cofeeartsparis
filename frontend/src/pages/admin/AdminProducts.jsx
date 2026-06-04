import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });
const emptyForm = { name: '', description: '', price: '', category: '', image: '', stock: '' };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => axios.get(`${API}/products`).then(r => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      editing
        ? await axios.put(`${API}/products/${editing}`, form, { headers: h() })
        : await axios.post(`${API}/products`, form, { headers: h() });
      setForm(emptyForm); setEditing(null); setShowForm(false); load();
    } catch (err) { alert(err.response?.data?.message || 'Erreur'); }
  };

  const handleEdit = (p) => {
    setEditing(p._id);
    setForm({ name: p.name, description: p.description || '', price: p.price, category: p.category || '', image: p.image || '', stock: p.stock });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    await axios.delete(`${API}/products/${id}`, { headers: h() });
    load();
  };

  const fields = [['name','Nom *'],['description','Description'],['price','Prix (€) *'],['category','Catégorie'],['image','URL Image'],['stock','Stock *']];

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c1810' }}>📦 Gestion Produits</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyForm); }} style={{
          background: '#2c1810', color: '#fff', border: 'none', padding: '0.8rem 1.5rem',
          borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
        }}>
          {showForm ? '✕ Annuler' : '+ Ajouter un produit'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
          <h3 style={{ color: '#2c1810', marginBottom: '1rem' }}>{editing ? 'Modifier le produit' : 'Nouveau produit'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {fields.map(([k, label]) => (
              <input key={k} placeholder={label} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', gridColumn: k === 'description' ? '1/-1' : 'auto' }} />
            ))}
          </div>
          <button type="submit" style={{ marginTop: '1rem', background: '#27ae60', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editing ? '💾 Enregistrer' : '✅ Ajouter'}
          </button>
        </form>
      )}

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2c1810', color: '#fff' }}>
              {['Nom', 'Catégorie', 'Prix', 'Stock', 'Actions'].map(h => (
                <th key={h} style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '1rem', fontWeight: '500', color: '#2c1810' }}>{p.name}</td>
                <td style={{ padding: '1rem' }}><span style={{ background: '#f0e8dc', color: '#8b5e3c', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.8rem' }}>{p.category}</span></td>
                <td style={{ padding: '1rem', color: '#d4a96a', fontWeight: 'bold' }}>{p.price}€</td>
                <td style={{ padding: '1rem' }}><span style={{ color: p.stock > 5 ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>{p.stock}</span></td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(p)} style={{ background: '#3498db', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>✏️ Modifier</button>
                  <button onClick={() => handleDelete(p._id)} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>🗑 Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Aucun produit.</p>}
      </div>
    </div>
  );
}