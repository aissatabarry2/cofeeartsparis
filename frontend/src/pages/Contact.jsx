import { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
    } catch { alert('Erreur lors de l\'envoi'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '3rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>Contact</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Une question ? Écrivez-nous.</p>
      {sent ? (
        <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h3>Message envoyé !</h3>
          <p>Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <input placeholder="Objet" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
            style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ddd' }} />
          <textarea placeholder="Votre message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            rows={6} style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }} />
          <button type="submit" disabled={loading} style={{
            background: '#2c1810', color: '#fff', padding: '1rem', border: 'none',
            borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
          }}>
            {loading ? 'Envoi...' : 'Envoyer le message'}
          </button>
        </form>
      )}
    </div>
  );
}