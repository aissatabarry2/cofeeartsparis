import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const API = process.env.REACT_APP_API_URL;

export default function Boutique() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const url = category ? `${API}/products?category=${category}` : `${API}/products`;
    axios.get(url).then(r => { setProducts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [category]);

  const categories = ['', 'Café', 'Céramique', 'Accessoires'];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>Boutique</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Cafés de spécialité, céramiques et accessoires</p>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            padding: '0.5rem 1.2rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem',
            background: category === cat ? '#2c1810' : '#fff',
            color: category === cat ? '#fff' : '#2c1810',
            border: '1px solid #2c1810'
          }}>
            {cat || 'Tout'}
          </button>
        ))}
      </div>

      {loading ? <p>Chargement...</p> : products.length === 0 ? <p>Aucun produit disponible.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {products.map(p => (
            <div key={p._id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}>
              <div style={{ height: '200px', background: '#f0e8dc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                {p.category === 'Café' ? '☕' : p.category === 'Céramique' ? '🏺' : '⚗️'}
              </div>
              <div style={{ padding: '1.2rem' }}>
                <span style={{ fontSize: '0.75rem', background: '#f0e8dc', color: '#8b5e3c', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>{p.category}</span>
                <h3 style={{ color: '#2c1810', margin: '0.6rem 0 0.4rem' }}>{p.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#d4a96a', fontWeight: 'bold', fontSize: '1.2rem' }}>{p.price}€</span>
                  <button onClick={() => addToCart(p)} style={{
                    background: '#2c1810', color: '#fff', border: 'none', padding: '0.6rem 1.2rem',
                    borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem'
                  }}>
                    + Panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}