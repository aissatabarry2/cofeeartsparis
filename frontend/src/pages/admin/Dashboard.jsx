import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

export default function Dashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, revenue: 0 });

  useEffect(() => {
    axios.get(`${API}/orders/stats`, { headers: h() }).then(r => setStats(r.data)).catch(() => {});
  }, []);

  const cards = [
    { label: 'Produits', icon: '📦', to: '/admin/products', color: '#3498db' },
    { label: 'Commandes', icon: '📋', to: '/admin/orders', color: '#27ae60' },
    { label: 'Ateliers', icon: '🎨', to: '/admin/ateliers', color: '#9b59b6' },
    { label: 'Messages', icon: '✉️', to: '/admin/contacts', color: '#e67e22' },
    { label: 'Utilisateurs', icon: '👥', to: '/admin/users', color: '#e74c3c' },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '0.3rem' }}>🛠 Dashboard Admin</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Bienvenue dans l'interface d'administration</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Total commandes', value: stats.totalOrders, icon: '📋', color: '#27ae60' },
          { label: 'Chiffre d\'affaires', value: `${stats.revenue}€`, icon: '💰', color: '#d4a96a' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 15px rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: '2rem', fontWeight: 'bold' }}>{s.value}</div>
            </div>
            <div style={{ fontSize: '2.5rem' }}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Nav cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.2rem' }}>
        {cards.map(c => (
          <Link key={c.to} to={c.to} style={{
            background: c.color, color: '#fff', padding: '1.8rem',
            borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{c.icon}</div>
            <div style={{ fontSize: '1rem' }}>{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}