import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./AdminLayout.css";

const menuItems = [
  { icon: "📊", label: "Dashboard", path: "/admin" },
  { icon: "🛒", label: "Commandes", path: "/admin/commandes" },
  { icon: "💳", label: "Paiements Square", path: "/admin/paiements" },
  { icon: "🏺", label: "Céramique", path: "/admin/ceramique" },
  { icon: "🛍️", label: "Goodies / Lifestyle", path: "/admin/goodies" },
  { icon: "📅", label: "Ateliers Standards", path: "/admin/ateliers" },
  { icon: "🌙", label: "Atelier Iftar Ramadan", path: "/admin/iftar" },
  { icon: "🗓️", label: "Calendrier", path: "/admin/calendrier" },
  { icon: "🎁", label: "Cartes cadeaux", path: "/admin/cartes-cadeaux" },
  { icon: "🚚", label: "Frais de livraison", path: "/admin/livraison" },
  { icon: "📝", label: "Blogs", path: "/admin/blogs" },
  { icon: "👥", label: "Utilisateurs", path: "/admin/users" },
  { icon: "✉️", label: "Messages", path: "/admin/messages" },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-wrapper">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">☕</div>
          <div className="logo-text">
            <span className="logo-title">Coffee Arts</span>
            <span className="logo-sub">Paris</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <Link to="/" className="nav-item return-site">
            <span className="nav-icon">↩️</span>
            <span className="nav-label">Revenir au site</span>
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <div className="admin-main">
        {/* TOPBAR */}
        <header className="admin-topbar">
          <div className="topbar-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="topbar-right">
            <button className="notif-btn">
              🔔<span className="notif-badge">2</span>
            </button>
            <div className="topbar-user">
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.name || "Admin"}</span>
                <span className="user-email">{user?.email || ""}</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Déconnexion">
              🚪
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="admin-content">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="admin-footer">
          <span>☕ Coffee Arts Paris Admin Panel © 2026</span>
          <span>Version 1.0.0 · Administration</span>
        </footer>
      </div>
    </div>
  );
}