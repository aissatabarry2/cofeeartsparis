import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Ateliers.css";

const API = process.env.REACT_APP_API_URL;

const TABS = [
  { key: "standard", label: "Standard", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )},
  { key: "iftar", label: "Iftar at Coffee Art Paris", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  )},
];

const LEVEL_COLORS = {
  débutant:     { bg: "#e8f5e9", color: "#2e7d32" },
  intermédiaire:{ bg: "#fff3e0", color: "#e65100" },
  avancé:       { bg: "#fce4ec", color: "#c2185b" },
};

export default function Ateliers() {
  const [ateliers, setAteliers] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setTab]     = useState("standard");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/ateliers`)
      .then(r => {
        // ✅ NORMALISATION ICI (IMPORTANT)
        const data = (r.data || []).map(a => ({
          ...a,
          type: a.type || (a.category === "Iftar Ramadan" ? "iftar" : "standard"),
          category: a.category || "standard",
          level: a.level || "débutant",
          image: a.image || null
        }));

        setAteliers(data);
      })
      .catch(() => setAteliers([]))
      .finally(() => setLoading(false));
  }, []);

  // ✅ FILTER FIXÉ (plus de dépendance fragile à title.includes)
  const filtered = ateliers.filter(a =>
    activeTab === "iftar"
      ? a.type === "iftar"
      : a.type !== "iftar"
  );

  const formatDate = (d) => new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  const handleReserve = (atelier) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setSelected(atelier);
  };

  const confirmReserve = async () => {
    try {
      await axios.post(`${API}/ateliers/${selected._id}/reserve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("✅ Réservation confirmée !");
      setSelected(null);
    } catch (e) {
      alert(e.response?.data?.message || "Erreur lors de la réservation");
    }
  };

  const getImg = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${API?.replace("/api", "")}/uploads/${img}`;
  };

  return (
    <div className="at-page">

      {/* HERO */}
      <div className="at-hero">
        <div className="at-hero-bg" />
        <div className="at-hero-content">
          <h1 className="at-hero-title">Nos <em>ateliers</em></h1>

          <div className="at-tabs">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`at-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setTab(tab.key)}
              >
                <span className="at-tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="at-section">
        <div className="at-container">
          {loading ? (
            <div className="at-loading">Chargement des ateliers...</div>
          ) : filtered.length === 0 ? (
            <div className="at-empty">Aucun atelier disponible pour le moment.</div>
          ) : (
            <div className="at-grid">
              {filtered.map(a => {
                const lc = LEVEL_COLORS[a.level?.toLowerCase()] || LEVEL_COLORS["débutant"];

                return (
                  <div className="at-card" key={a._id}>
                    <div className="at-card-img-wrap">

                      {getImg(a.image)
                        ? <img src={getImg(a.image)} alt={a.title} className="at-card-img" />
                        : <div className="at-card-img-ph">🏺</div>
                      }

                      {a.level && (
                        <span className="at-card-level" style={{ background: lc.bg, color: lc.color }}>
                          {a.level}
                        </span>
                      )}

                      {a.placesLeft <= 2 && a.placesLeft > 0 && (
                        <span className="at-card-urgent">
                          ⚡ {a.placesLeft} place(s) restante(s)
                        </span>
                      )}

                      {a.placesLeft === 0 && (
                        <span className="at-card-full">Complet</span>
                      )}
                    </div>

                    <div className="at-card-body">
                      <h3 className="at-card-title">{a.title}</h3>

                      <p className="at-card-desc">
                        {a.description?.slice(0, 100)}
                      </p>

                      <div className="at-card-footer">
                        <span className="at-card-price">{a.price}€</span>

                        <button
                          className={`at-btn-reserve ${a.placesLeft === 0 ? "disabled" : ""}`}
                          onClick={() => a.placesLeft !== 0 && handleReserve(a)}
                          disabled={a.placesLeft === 0}
                        >
                          {a.placesLeft === 0 ? "Complet" : "Réserver"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="at-overlay" onClick={() => setSelected(null)}>
          <div className="at-modal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)}>✕</button>

            <h2>Confirmer</h2>
            <p>{selected.title}</p>
            <p>{selected.price}€</p>

            <button onClick={confirmReserve}>Confirmer</button>
          </div>
        </div>
      )}

    </div>
  );
}