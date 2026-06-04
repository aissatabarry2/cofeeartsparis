import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";



import Home from "./pages/Home";
import Boutique from "./pages/Boutique";
import Ateliers from "./pages/Ateliers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ClientSpace from "./pages/ClientSpace";

import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAteliers from "./pages/admin/AdminAteliers";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBlogs from "./pages/admin/AdminBlogs";


import AdminLayout from "./pages/components/admin/AdminLayout";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";
import HeroSection from "./pages/components/HeroSection";
import MenuSection from "./pages/components/MenuSection";
import VisitSection from "./pages/components/VisitSection";

function AdminRoute({ children }) {
  const { user } = useAuth();

  return user?.role === "admin"
    ? children
    : <Navigate to="/login" replace />;
}

function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>

          <Navbar />

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <MenuSection />
                  <VisitSection />
                  <Home />
                </>
              }
            />

            {/* PAGES PUBLIQUES */}
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/ateliers" element={<Ateliers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />

            {/* ESPACE CLIENT */}
            <Route
              path="/espace-client"
              element={
                <PrivateRoute>
                  <ClientSpace />
                </PrivateRoute>
              }
            />

            {/* ADMIN DASHBOARD */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* PRODUITS */}
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminProducts />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* COMMANDES */}
            <Route
              path="/admin/commandes"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminOrders />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* ATELIERS */}
            <Route
              path="/admin/ateliers"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminAteliers />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* CONTACTS */}
            <Route
              path="/admin/contacts"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminContacts />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* UTILISATEURS */}
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminUsers />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
  path="/admin/blogs"
  element={
    <AdminRoute>
      <AdminLayout>
        <AdminBlogs />
      </AdminLayout>
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