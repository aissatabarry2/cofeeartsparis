import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await axios.post(`${API}/auth/login`, form);
      login(res.data.user, res.data.token);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/espace-client');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf9f7' }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#2c1810', marginBottom: '0.5rem' }}>Connexion</h2>
        <p style={{ textAlign: 'center', color: '#999', marginBottom: '2rem', fontSize: '0.9rem' }}>Bienvenue sur CoffeeArt Paris</p>
        {error && <p style={{ background: '#fee', color: '#c00', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            placeholder="Email" type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem' }}
          />
          <input
            placeholder="Mot de passe" type="password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem' }}
          />
          <button type="submit" disabled={loading} style={{
            background: '#2c1810', color: '#fff', padding: '0.9rem',
            borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold'
          }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
          Pas de compte ? <Link to="/register" style={{ color: '#d4a96a', fontWeight: 'bold' }}>S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}