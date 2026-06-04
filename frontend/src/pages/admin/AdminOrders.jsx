import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });
const statusColors = { pending: '#f39c12', confirmed: '#3498db', shipped: '#9b59b6', delivered: '#27ae60' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => axios.get(`${API}/orders`, { headers: h() }).then(r => setOrders(r.data));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/orders/${id}`, { status }, { headers: h() });
    load();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '2rem' }}>📋 Gestion Commandes</h1>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2c1810', color: '#fff' }}>
              {['ID', 'Client', 'Articles', 'Total', 'Statut', 'Date'].map(h => (
                <th key={h} style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o._id} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#888' }}>#{o._id.slice(-8).toUpperCase()}</td>
                <td style={{ padding: '1rem' }}><strong>{o.user?.name || '—'}</strong><br /><span style={{ color: '#888', fontSize: '0.8rem' }}>{o.user?.email}</span></td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#666', maxWidth: '180px' }}>{o.items?.map(i => `${i.name} ×${i.quantity}`).join(', ')}</td>
                <td style={{ padding: '1rem', color: '#d4a96a', fontWeight: 'bold' }}>{o.total}€</td>
                <td style={{ padding: '1rem' }}>
                  <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)} style={{
                    background: statusColors[o.status] || '#888', color: '#fff',
                    border: 'none', padding: '0.3rem 0.6rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem'
                  }}>
                    {['pending', 'confirmed', 'shipped', 'delivered'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#888' }}>{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Aucune commande.</p>}
      </div>
    </div>
  );
}