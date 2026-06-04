import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL;

export default function ClientSpace() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${API}/orders`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => setOrders(r.data)).catch(() => {});
  }, []);

  const statusColor = { pending: '#f39c12', confirmed: '#3498db', shipped: '#9b59b6', delivered: '#27ae60' };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ background: 'linear-gradient(135deg, #2c1810, #4a2c1a)', color: '#fff', padding: '2rem', borderRadius: '14px', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.3rem' }}>👤 Mon espace client</h1>
        <p style={{ color: '#d4a96a' }}>Bienvenue, {user?.name} !</p>
        <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '0.3rem' }}>{user?.email}</p>
      </div>

      <h2 style={{ color: '#2c1810', marginBottom: '1.5rem' }}>Mes commandes</h2>
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '12px', color: '#888' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <p>Aucune commande pour l'instant.</p>
        </div>
      ) : orders.map(o => (
        <div key={o._id} style={{ background: '#fff', borderRadius: '10px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <div>
              <strong style={{ color: '#2c1810' }}>Commande #{o._id.slice(-8).toUpperCase()}</strong>
              <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                {new Date(o.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ background: statusColor[o.status] || '#888', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                {o.status}
              </span>
              <strong style={{ color: '#d4a96a', fontSize: '1.1rem' }}>{o.total}€</strong>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>
            {o.items?.map((item, i) => <span key={i}>{item.name} ×{item.quantity}{i < o.items.length - 1 ? ', ' : ''}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}