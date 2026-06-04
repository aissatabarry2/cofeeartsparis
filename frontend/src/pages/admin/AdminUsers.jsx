import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = () => axios.get(`${API}/users`, { headers: h() }).then(r => setUsers(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    await axios.delete(`${API}/users/${id}`, { headers: h() });
    load();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '2rem' }}>👥 Gestion Utilisateurs ({users.length})</h1>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2c1810', color: '#fff' }}>
              {['Nom', 'Email', 'Rôle', 'Inscrit le', 'Action'].map(h => (
                <th key={h} style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{u.name}</td>
                <td style={{ padding: '1rem', color: '#666', fontSize: '0.9rem' }}>{u.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: u.role === 'admin' ? '#d4a96a' : '#e8f5e9', color: u.role === 'admin' ? '#1a0f0a' : '#27ae60', padding: '0.2rem 0.7rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#888', fontSize: '0.85rem' }}>{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                <td style={{ padding: '1rem' }}>
                  {u.role !== 'admin' && (
                    <button onClick={() => handleDelete(u._id)} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>🗑 Supprimer</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}