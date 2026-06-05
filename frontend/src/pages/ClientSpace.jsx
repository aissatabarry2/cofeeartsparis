import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ClientSpace.css";

const API = process.env.REACT_APP_API_URL;

const TABS = [
  { key: "compte",    label: "Mon compte",       icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { key: "historique",label: "Historique",        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
  { key: "wishlist",  label: "Wishlist",          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> },
  { key: "suivi",     label: "Suivi de commande", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { key: "ateliers",  label: "Mes ateliers",      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
];

export default function ClientSpace() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ateliers");
  const [orders, setOrders] = useState([]);
  const [ateliers, setAteliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "client";

  useEffect(() => {
    if (activeTab === "historique" || activeTab === "suivi") loadOrders();
    if (activeTab === "ateliers") loadAteliers();
  }, [activeTab]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/orders/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch { setOrders([]); }
    finally { setLoading(false); }
  };

  const loadAteliers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/ateliers/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAteliers(res.data);
    } catch { setAteliers([]); }
    finally { setLoading(false); }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div className="cs-page">
      <div className="cs-container">

        {/* Header */}
        <div className="cs-header">
          <h1 className="cs-title">Espace client</h1>
          <p className="cs-welcome">Bienvenue, {firstName}</p>
        </div>

        {/* Tabs */}
        <div className="cs-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`cs-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="cs-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cs-divider" />

        {/* Content */}
        <div className="cs-content">

          {/* ── Mon compte ── */}
          {activeTab === "compte" && (
            <div className="cs-card">
              <h2 className="cs-card-title">Mes informations</h2>
              <div className="cs-info-grid">
                <div className="cs-info-item">
                  <span className="cs-info-label">Nom complet</span>
                  <span className="cs-info-value">{user?.name || "—"}</span>
                </div>
                <div className="cs-info-item">
                  <span className="cs-info-label">Email</span>
                  <span className="cs-info-value">{user?.email || "—"}</span>
                </div>
                <div className="cs-info-item">
                  <span className="cs-info-label">Rôle</span>
                  <span className="cs-info-value cs-badge">{user?.role || "client"}</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Historique ── */}
          {activeTab === "historique" && (
            <div className="cs-card">
              <h2 className="cs-card-title">Historique des commandes</h2>
              {loading ? <div className="cs-empty-msg">Chargement...</div>
              : orders.length === 0 ? (
                <div className="cs-empty">
                  <div className="cs-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                  <p>Aucune commande pour le moment</p>
                  <button className="cs-btn" onClick={() => navigate("/boutique")}>Découvrir la boutique</button>
                </div>
              ) : (
                <div className="cs-order-list">
                  {orders.map(o => (
                    <div className="cs-order-item" key={o._id}>
                      <div>
                        <div className="cs-order-id">Commande #{o._id.slice(-6).toUpperCase()}</div>
                        <div className="cs-order-date">{formatDate(o.createdAt)}</div>
                      </div>
                      <div className="cs-order-price">{o.totalPrice?.toFixed(2)}€</div>
                      <span className={`cs-status cs-status-${o.status}`}>{o.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Wishlist ── */}
          {activeTab === "wishlist" && (
            <div className="cs-card">
              <h2 className="cs-card-title">Ma wishlist</h2>
              <div className="cs-empty">
                <div className="cs-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </div>
                <p>Votre wishlist est vide</p>
                <button className="cs-btn" onClick={() => navigate("/boutique")}>Explorer la boutique</button>
              </div>
            </div>
          )}

          {/* ── Suivi de commande ── */}
          {activeTab === "suivi" && (
            <div className="cs-card">
              <h2 className="cs-card-title">Suivi de commande</h2>
              {loading ? <div className="cs-empty-msg">Chargement...</div>
              : orders.length === 0 ? (
                <div className="cs-empty">
                  <div className="cs-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  </div>
                  <p>Aucune commande en cours</p>
                  <button className="cs-btn" onClick={() => navigate("/boutique")}>Passer une commande</button>
                </div>
              ) : (
                <div className="cs-order-list">
                  {orders.filter(o => o.status !== "delivered").map(o => (
                    <div className="cs-order-item" key={o._id}>
                      <div>
                        <div className="cs-order-id">#{o._id.slice(-6).toUpperCase()}</div>
                        <div className="cs-order-date">{formatDate(o.createdAt)}</div>
                      </div>
                      <div className="cs-track-steps">
                        {["pending","processing","shipped","delivered"].map((s, i) => (
                          <div key={s} className={`cs-track-step ${["pending","processing","shipped","delivered"].indexOf(o.status) >= i ? "done" : ""}`}>
                            <div className="cs-track-dot" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Mes ateliers ── */}
          {activeTab === "ateliers" && (
            <div className="cs-card">
              <h2 className="cs-card-title">Mes ateliers réservés</h2>
              {loading ? <div className="cs-empty-msg">Chargement...</div>
              : ateliers.length === 0 ? (
                <div className="cs-empty">
                  <div className="cs-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <p>Aucun atelier réservé pour le moment</p>
                  <button className="cs-btn" onClick={() => navigate("/ateliers")}>Réserver un atelier</button>
                </div>
              ) : (
                <div className="cs-atelier-list">
                  {ateliers.map(a => (
                    <div className="cs-atelier-item" key={a._id}>
                      <div className="cs-atelier-date-box">
                        <span className="cs-atelier-day">{new Date(a.date).getDate()}</span>
                        <span className="cs-atelier-month">{new Date(a.date).toLocaleDateString("fr-FR",{month:"short"}).toUpperCase()}</span>
                      </div>
                      <div className="cs-atelier-info">
                        <div className="cs-atelier-name">{a.title}</div>
                        <div className="cs-atelier-meta">{a.price}€ · {formatDate(a.date)}</div>
                      </div>
                      <span className="cs-badge-green">Confirmé</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}