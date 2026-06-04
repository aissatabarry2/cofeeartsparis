import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`${API}/contact`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => setMessages(r.data)).catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '2rem' }}>✉️ Messages de contact ({messages.length})</h1>
      {messages.length === 0 ? <p style={{ color: '#888', textAlign: 'center', padding: '3rem' }}>Aucun message.</p> :
        messages.map(m => (
          <div key={m._id} style={{ background: '#fff', borderRadius: '10px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <div>
                <strong style={{ color: '#2c1810' }}>{m.name}</strong>
                <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: '0.8rem' }}>{m.email}</span>
              </div>
              <span style={{ color: '#aaa', fontSize: '0.8rem' }}>{new Date(m.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
            {m.subject && <div style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem' }}>Objet : {m.subject}</div>}
            <p style={{ color: '#444', lineHeight: '1.6', fontSize: '0.95rem', background: '#f8f8f8', padding: '1rem', borderRadius: '8px', margin: 0 }}>{m.message}</p>
          </div>
        ))
      }
    </div>
  );
}