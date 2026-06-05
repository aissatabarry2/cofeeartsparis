import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./AdminLayout.css";

/* ── SVG Icons ── */
const Ico = {
  dashboard: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  cart:      <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  card:      <svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  vase:      <svg viewBox="0 0 24 24"><path d="M9 3h6l1 5c1 3 0 6-2 8l-1 5H11l-1-5c-2-2-3-5-2-8l1-5z"/><line x1="8" y1="3" x2="16" y2="3"/></svg>,
  bag:       <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  calendar:  <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  moon:      <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  ticket:    <svg viewBox="0 0 24 24"><path d="M15 5H3a1 1 0 00-1 1v4a2 2 0 010 4v4a1 1 0 001 1h12"/><path d="M9 5h12a1 1 0 011 1v4a2 2 0 000 4v4a1 1 0 01-1 1H9"/><line x1="9" y1="5" x2="9" y2="19" strokeDasharray="2 2"/></svg>,
  truck:     <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  users:     <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  blog:      <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  mail:      <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  back:      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  bell:      <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  logout:    <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  search:    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chevron:   <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>,
};

const NAV = [
  { label: "Dashboard",            ico: Ico.dashboard, path: "/admin" },
  { label: "Commandes",            ico: Ico.cart,      path: "/admin/commandes" },
  { label: "Paiements Square",     ico: Ico.card,      path: "/admin/paiements" },
  { label: "Céramique",            ico: Ico.vase,      path: "/admin/ceramique" },
  { label: "Goodies / Lifestyle",  ico: Ico.bag,       path: "/admin/products" },
  { label: "Ateliers Standards",   ico: Ico.calendar,  path: "/admin/ateliers" },
  {
    label: "Atelier Iftar Ramadan",
    ico: Ico.moon,
    path: null,
    sub: [
      { label: "Inscriptions", path: "/admin/iftar/inscriptions" },
      { label: "Calendrier",   path: "/admin/iftar/calendrier" },
    ],
  },
  { label: "Calendrier",           ico: Ico.calendar,  path: "/admin/calendrier" },
  { label: "Cartes cadeaux",       ico: Ico.ticket,    path: "/admin/cartes" },
  { label: "Frais de livraison",   ico: Ico.truck,     path: "/admin/livraison" },
  { label: "Blogs",                ico: Ico.blog,      path: "/admin/blogs" },
  { label: "Utilisateurs",         ico: Ico.users,     path: "/admin/users" },
  { label: "Messages",             ico: Ico.mail,      path: "/admin/contacts" },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSub, setOpenSub] = useState(null);
  const [search, setSearch] = useState("");

  const handleLogout = () => { logout(); navigate("/login"); };

  const isActive = (path) => {
    if (!path) return false;
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  return (
    <div className="al-root">

      {/* ── SIDEBAR ── */}
      <aside className="al-sidebar">

        {/* Logo */}
        <div className="al-logo">
          <img
            src="/images/logo.png"
            alt="Coffee Arts"
            className="al-logo-img"
            onError={e => e.target.style.display = "none"}
          />
          <span className="al-logo-name">Coffee Arts</span>
          <span className="al-logo-sub">Paris</span>
        </div>

        {/* Nav */}
        <nav className="al-nav">
          {NAV.map((item, i) => {
            if (item.sub) {
              const open = openSub === i;
              return (
                <div key={i}>
                  <button
                    className={`al-item${open ? " al-open" : ""}`}
                    onClick={() => setOpenSub(open ? null : i)}
                  >
                    <span className="al-ico">{item.ico}</span>
                    <span className="al-lbl">{item.label}</span>
                    <span className={`al-chev${open ? " al-chev-open" : ""}`}>{Ico.chevron}</span>
                  </button>
                  {open && (
                    <div className="al-sub">
                      {item.sub.map(s => (
                        <Link
                          key={s.path}
                          to={s.path}
                          className={`al-sub-item${location.pathname === s.path ? " al-active" : ""}`}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={i}
                to={item.path}
                className={`al-item${isActive(item.path) ? " al-active" : ""}`}
              >
                <span className="al-ico">{item.ico}</span>
                <span className="al-lbl">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="al-sidebar-bottom">
          <Link to="/" className="al-item al-return">
            <span className="al-ico">{Ico.back}</span>
            <span className="al-lbl">Revenir au site</span>
          </Link>
        </div>
      </aside>

      {/* ── TOPBAR ── */}
      <header className="al-topbar">
        <div className="al-search">
          <span className="al-search-ico">{Ico.search}</span>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="al-topbar-right">
          <button className="al-bell">
            {Ico.bell}
            <span className="al-bell-dot" />
          </button>

          <div className="al-user">
            <div className="al-avatar">{initials}</div>
            <div className="al-user-info">
              <span className="al-user-name">{user?.name || "Admin Coffee Arts Paris"}</span>
              <span className="al-user-email">{user?.email || "coffeeartsparis@gmail.com"}</span>
            </div>
          </div>

          <button className="al-logout" onClick={handleLogout} title="Déconnexion">
            {Ico.logout}
          </button>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main className="al-content">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="al-footer">
        <span>☕ Coffee Arts Paris Admin Panel © 2026</span>
        <span>Version 1.0.0 · Administration</span>
      </footer>

    </div>
  );
}