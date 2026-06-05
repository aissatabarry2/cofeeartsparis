import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    revenue: 0, revenueMonth: 0, revenueWeek: 0, revenueDay: 0,
    orders: 0, users: 0, products: 0, messages: 0,
    unread: 0, ateliers: 0, blogs: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [ordRes, usrRes, prdRes, msgRes, atlRes, blgRes] = await Promise.allSettled([
          axios.get(`${API}/orders`,   { headers: h() }),
          axios.get(`${API}/users`,    { headers: h() }),
          axios.get(`${API}/products`, { headers: h() }),
          axios.get(`${API}/contact`,  { headers: h() }),
          axios.get(`${API}/ateliers`, { headers: h() }),
          axios.get(`${API}/blogs`),
        ]);

        const orders   = ordRes.status   === "fulfilled" ? ordRes.value.data   : [];
        const users    = usrRes.status   === "fulfilled" ? usrRes.value.data   : [];
        const products = prdRes.status   === "fulfilled" ? prdRes.value.data   : [];
        const messages = msgRes.status   === "fulfilled" ? msgRes.value.data   : [];
        const ateliers = atlRes.status   === "fulfilled" ? atlRes.value.data   : [];
        const blogs    = blgRes.status   === "fulfilled" ? blgRes.value.data   : [];

        const now   = new Date();
        const month = now.getMonth();
        const week  = new Date(now - 7 * 86400000);
        const today = new Date(now.setHours(0,0,0,0));

        const revenue      = orders.reduce((s, o) => s + (o.total || 0), 0);
        const revenueMonth = orders.filter(o => new Date(o.createdAt).getMonth() === month).reduce((s,o) => s+(o.total||0), 0);
        const revenueWeek  = orders.filter(o => new Date(o.createdAt) >= week).reduce((s,o) => s+(o.total||0), 0);
        const revenueDay   = orders.filter(o => new Date(o.createdAt) >= today).reduce((s,o) => s+(o.total||0), 0);

        setStats({
          revenue, revenueMonth, revenueWeek, revenueDay,
          orders:   orders.length,
          users:    users.length,
          products: products.length,
          messages: messages.length,
          unread:   messages.filter(m => !m.read).length,
          ateliers: ateliers.length,
          blogs:    blogs.length,
        });
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  const fmt = (n) => `${Number(n).toFixed(2)}€`;

  /* Chaque card avec son chemin de navigation */
  const topCards = [
    { label: "Revenus totaux",    sub: "Chiffre d'affaires", value: fmt(stats.revenue),      icon: "💰", color: "#4a5c44" },
    { label: "Revenus du mois",   sub: "Ce mois",            value: fmt(stats.revenueMonth),  icon: "📅", color: "#4a5c44" },
    { label: "Revenus de la sem.", sub: "Cette semaine",      value: fmt(stats.revenueWeek),   icon: "📈", color: "#4a5c44" },
  ];

  const bottomCards = [
    { label: "Revenus du jour",  sub: "Aujourd'hui",        value: fmt(stats.revenueDay), icon: "☀️",  path: null },
    { label: "Commandes",        sub: "Total des commandes", value: stats.orders,          icon: "🛒",  path: "/admin/commandes" },
    { label: "Utilisateurs",     sub: "Comptes actifs",      value: stats.users,           icon: "👥",  path: "/admin/users" },
    { label: "Produits",         sub: "En catalogue",        value: stats.products,        icon: "📦",  path: "/admin/ceramique" },
    { label: "Messages",         sub: "Total reçus",         value: stats.messages,        icon: "✉️",  path: "/admin/contacts" },
    { label: "Non lus",          sub: "Messages en attente", value: stats.unread,          icon: "📬",  path: "/admin/contacts" },
    { label: "Ateliers",         sub: "Ateliers en cours",   value: stats.ateliers,        icon: "🎨",  path: "/admin/ateliers" },
    { label: "Blogs",            sub: "Articles publiés",    value: stats.blogs,           icon: "📝",  path: "/admin/blogs" },
  ];

  return (
    <div className="dash-page">

      {/* Header */}
      <div className="dash-header">
        <div>
          <h1>Dashboard</h1>
          <p>Vue d'ensemble de votre activité</p>
        </div>
        <button className="dash-reset-btn">
          <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
          Réinitialiser
        </button>
      </div>

      {/* Top 3 — revenus */}
      <div className="dash-top-grid">
        {topCards.map((c, i) => (
          <div className="dash-rev-card" key={i}>
            <div className="dash-rev-card-top">
              <svg className="dash-stack-ico" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              <button className="dash-eye-btn">
                <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <div className="dash-rev-value">{c.value}</div>
            <div className="dash-rev-label">{c.label}</div>
            <div className="dash-rev-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Bottom grid — stats cliquables */}
      <div className="dash-bot-grid">
        {bottomCards.map((c, i) => (
          <div
            key={i}
            className={`dash-stat-card${c.path ? " dash-stat-clickable" : ""}`}
            onClick={() => c.path && navigate(c.path)}
            title={c.path ? `Aller vers ${c.label}` : ""}
          >
            <div className="dash-stat-icon">{c.icon}</div>
            <div className="dash-stat-value">{c.value}</div>
            <div className="dash-stat-label">{c.label}</div>
            <div className="dash-stat-sub">{c.sub}</div>
            {c.path && (
              <div className="dash-stat-arrow">
                <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}