import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });
const empty = { title: '', description: '', price: '', date: '', places: '' };

export default function AdminAteliers() {
  const [ateliers, setAteliers] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => axios.get(`${API}/ateliers`).then(r => setAteliers(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    editing
      ? await axios.put(`${API}/ateliers/${editing}`, form, { headers: h() })
      : await axios.post(`${API}/ateliers`, form, { headers: h() });
    setForm(empty); setEditing(null); setShowForm(false); load();
  };

  const handleEdit = (a) => {
    setEditing(a._id);
    setForm({ title: a.title, description: a.description || '', price: a.price, date: a.date?.slice(0, 10), places: a.places });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    await axios.delete(`${API}/ateliers/${id}`, { headers: h() });
    load();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c1810' }}>🎨 Gestion Ateliers</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(empty); }}
          style={{ background: '#2c1810', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          {showForm ? '✕ Annuler' : '+ Ajouter un atelier'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {[['title','Titre *'],['price','Prix (€) *'],['date','Date *'],['places','Nombre de places *'],['description','Description']].map(([k, l]) => (
              <input key={k} placeholder={l} type={k === 'date' ? 'date' : 'text'} value={form[k]}
                onChange={e => setForm({ ...form, [k]: e.target.value })}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', gridColumn: k === 'description' ? '1/-1' : 'auto' }} />
            ))}
          </div>
          <button type="submit" style={{ marginTop: '1rem', background: '#27ae60', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editing ? '💾 Enregistrer' : '✅ Ajouter'}
          </button>
        </form>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
        {ateliers.map(a => (
          <div key={a._id} style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            <h3 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>{a.title}</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.8rem' }}>{a.description}</p>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
              <div>📅 {new Date(a.date).toLocaleDateString('fr-FR')}</div>
              <div>👥 {a.placesLeft}/{a.places} places</div>
              <div style={{ color: '#d4a96a', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.3rem' }}>{a.price}€</div>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button onClick={() => handleEdit(a)} style={{ flex: 1, background: '#3498db', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>✏️ Modifier</button>
              <button onClick={() => handleDelete(a._id)} style={{ flex: 1, background: '#e74c3c', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>🗑 Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      {ateliers.length === 0 && <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Aucun atelier.</p>}
    </div>
  );
}