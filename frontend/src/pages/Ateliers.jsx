import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL;

export default function Ateliers() {
  const [ateliers, setAteliers] = useState([]);
  const { user } = useAuth();

  useEffect(() => { axios.get(`${API}/ateliers`).then(r => setAteliers(r.data)).catch(() => {}); }, []);

  const reserver = (a) => {
    if (!user) return alert('Connectez-vous pour réserver');
    alert(`✅ Réservation confirmée pour "${a.title}" !`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>Ateliers</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Céramique, latte art, dégustation…</p>
      {ateliers.length === 0 ? <p style={{ color: '#888' }}>Aucun atelier disponible pour l'instant.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {ateliers.map(a => (
            <div key={a._id} style={{ background: '#fff', borderRadius: '14px', padding: '1.8rem', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🎨</div>
              <h3 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>{a.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>{a.description}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem', fontSize: '0.85rem', color: '#666' }}>
                <span>📅 {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>👥 {a.placesLeft} places restantes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#d4a96a', fontWeight: 'bold', fontSize: '1.3rem' }}>{a.price}€</span>
                <button onClick={() => reserver(a)} style={{
                  background: a.placesLeft > 0 ? '#2c1810' : '#ccc',
                  color: '#fff', border: 'none', padding: '0.7rem 1.5rem',
                  borderRadius: '8px', cursor: a.placesLeft > 0 ? 'pointer' : 'not-allowed', fontSize: '0.9rem'
                }}>
                  {a.placesLeft > 0 ? 'Réserver' : 'Complet'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}