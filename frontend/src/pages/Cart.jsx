import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, total } = useCart();
  const { user } = useAuth();

  const handleOrder = async () => {
    if (!user) return alert('Connectez-vous pour commander');
    try {
      await axios.post(`${API}/orders`, {
        items: cart.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.qty })),
        total
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('✅ Commande passée ! (paiement simulé)');
      clearCart();
    } catch { alert('Erreur lors de la commande'); }
  };

  if (cart.length === 0) return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
      <h2 style={{ color: '#2c1810', marginBottom: '1rem' }}>Votre panier est vide</h2>
      <Link to="/boutique" style={{ background: '#2c1810', color: '#fff', padding: '0.8rem 2rem', borderRadius: '8px' }}>
        Voir la boutique
      </Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '750px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c1810', marginBottom: '2rem' }}>Mon Panier</h1>
      {cart.map(item => (
        <div key={item._id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 1.5rem', background: '#fff', borderRadius: '10px',
          marginBottom: '0.8rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div>
            <strong style={{ color: '#2c1810' }}>{item.name}</strong>
            <div style={{ color: '#d4a96a', fontWeight: 'bold', marginTop: '0.2rem' }}>{item.price}€</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button onClick={() => updateQty(item._id, item.qty - 1)} style={{ background: '#eee', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>−</button>
            <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
            <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ background: '#eee', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>+</button>
            <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '1.2rem', marginLeft: '0.5rem' }}>🗑</button>
          </div>
          <div style={{ fontWeight: 'bold', color: '#333', minWidth: '60px', textAlign: 'right' }}>
            {(item.price * item.qty).toFixed(2)}€
          </div>
        </div>
      ))}
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1.5rem', marginTop: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: '#2c1810', marginBottom: '1.2rem' }}>
          <span>Total</span><span>{total.toFixed(2)}€</span>
        </div>
        <button onClick={handleOrder} style={{
          width: '100%', background: '#2c1810', color: '#fff', padding: '1rem',
          border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
        }}>
          ✅ Commander — Paiement simulé
        </button>
      </div>
    </div>
  );
}