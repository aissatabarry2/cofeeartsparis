import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      await axios.post(`${API}/auth/register`, form);
      alert('Compte créé avec succès !');
      navigate('/login');
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf9f7' }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#2c1810', marginBottom: '2rem' }}>Créer un compte</h2>
        {error && <p style={{ background: '#fee', color: '#c00', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[['name','Nom complet','text'],['email','Email','email'],['password','Mot de passe','password']].map(([k, label, type]) => (
            <input key={k} placeholder={label} type={type} value={form[k]}
              onChange={e => setForm({ ...form, [k]: e.target.value })}
              style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem' }}
            />
          ))}
          <button type="submit" style={{ background: '#2c1810', color: '#fff', padding: '0.9rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            S'inscrire
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
          Déjà un compte ? <Link to="/login" style={{ color: '#d4a96a', fontWeight: 'bold' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}