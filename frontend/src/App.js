import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import Boutique from './pages/Boutique';
import Ateliers from './pages/Ateliers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ClientSpace from './pages/ClientSpace';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminAteliers from './pages/admin/AdminAteliers';
import AdminContacts from './pages/admin/AdminContacts';
import AdminUsers from './pages/admin/AdminUsers';
import Footer from "./pages/components/Footer";

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/login" />;
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{
      background: '#1a0f0a',
      padding: '0 2rem',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <Link to="/" style={{ color: '#d4a96a', fontWeight: 'bold', fontSize: '1.1rem' }}>☕ CoffeeArt</Link>
      <Link to="/boutique" style={{ color: '#ccc', fontSize: '0.95rem' }}>Boutique</Link>
      <Link to="/ateliers" style={{ color: '#ccc', fontSize: '0.95rem' }}>Ateliers</Link>
      <Link to="/contact" style={{ color: '#ccc', fontSize: '0.95rem' }}>Contact</Link>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/cart" style={{ color: '#ccc', fontSize: '0.95rem' }}>🛒</Link>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: '#d4a96a', fontSize: '0.9rem', border: '1px solid #d4a96a', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>
                Admin
              </Link>
            )}
            <Link to="/espace-client" style={{ color: '#ccc', fontSize: '0.9rem' }}>
              👤 {user.name}
            </Link>
            <button onClick={logout} style={{
              background: 'transparent', border: '1px solid #666', color: '#999',
              padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
            }}>
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#d4a96a', border: '1px solid #d4a96a', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
  <Navbar />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/boutique" element={<Boutique />} />
    <Route path="/ateliers" element={<Ateliers />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<Cart />} />
    <Route
      path="/espace-client"
      element={
        <PrivateRoute>
          <ClientSpace />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/products"
      element={
        <AdminRoute>
          <AdminProducts />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/orders"
      element={
        <AdminRoute>
          <AdminOrders />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/ateliers"
      element={
        <AdminRoute>
          <AdminAteliers />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/contacts"
      element={
        <AdminRoute>
          <AdminContacts />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <AdminRoute>
          <AdminUsers />
        </AdminRoute>
      }
    />
  </Routes>

  <Footer />
</BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}