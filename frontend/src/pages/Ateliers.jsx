import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Ateliers.css";

const API = process.env.REACT_APP_API_URL;
const PUB = process.env.PUBLIC_URL;

const TABS = [
  {
    key: "standard",
    label: "Standard",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  },
  {
    key: "iftar",
    label: "Iftar at Coffee Art Paris",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
  },
];

const INFOS = [
  { icon: "👐", title: "Ouvert à tous les niveaux", desc: "Les ateliers sont ouverts aux débutants comme aux personnes ayant déjà pratiqué. Chacun avance à son rythme, accompagné pas à pas, sans prérequis." },
  { icon: "👥", title: "En petits groupes", desc: "Les sessions se déroulent en groupes réduits afin de garantir un accompagnement attentif. Un cadre propice à l'échange, à la concentration et au plaisir de créer." },
  { icon: "🎯", title: "Une expérience encadrée", desc: "Chaque atelier est pensé pour être fluide, structuré et accessible. Le geste, la matière et le plaisir de créer restent au cœur de la pratique." },
];

export default function Ateliers() {
  const [ateliers, setAteliers] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setTab]     = useState("standard");
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/ateliers`)
      .then(r => {
        const data = (r.data || []).map(a => ({
          ...a,
          type: a.type || (a.category === "Iftar Ramadan" ? "iftar" : "standard"),
          level: a.level || "débutant",
          duration: a.duration || "2h",
          image: a.image || null,
        }));
        setAteliers(data);
      })
      .catch(() => setAteliers([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = ateliers.filter(a =>
    activeTab === "iftar" ? a.type === "iftar" : a.type !== "iftar"
  );

  const getImg = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${API?.replace("/api", "")}/uploads/${img}`;
  };

  const handleReserve = (a) => {
    if (!localStorage.getItem("token")) { navigate("/login"); return; }
    setSelected(a);
  };

  const confirmReserve = async () => {
    try {
      await axios.post(`${API}/ateliers/${selected._id}/reserve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setConfirmed(true);
      setTimeout(() => { setSelected(null); setConfirmed(false); }, 2000);
    } catch (e) {
      alert(e.response?.data?.message || "Erreur lors de la réservation");
    }
  };

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="at-page">

      {/* ── HERO ── */}
      <div className="at-hero"
      style={{ backgroundImage: `url('${PUB}/atelier-hero.png')` }}>
        <div className="at-hero-overlay" />
        <div className="at-hero-content">
          <h1 className="at-hero-title">Nos <em>ateliers</em></h1>
          <p className="at-hero-sub">
            Des ateliers de céramique pour explorer la matière, s'initier aux<br />
            gestes et vivre une expérience créative, au rythme de chacun.
          </p>
          <div className="at-tabs-wrap">
            <div className="at-tabs">
              {TABS.map(t => (
                <button
                  key={t.key}
                  className={`at-tab${activeTab === t.key ? " at-tab-active" : ""}`}
                  onClick={() => setTab(t.key)}
                >
                  <span className="at-tab-ico">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GRID SECTION ── */}
      <div className="at-section">
        <div className="at-container">
          {loading ? (
            <div className="at-loading">Chargement des ateliers...</div>
          ) : filtered.length === 0 ? (
            <div className="at-empty">Aucun atelier disponible pour le moment.</div>
          ) : (
            <div className="at-grid">
              {filtered.map(a => (
                <div className="at-card" key={a._id}>

                  {/* Image */}
                  <div className="at-card-img-wrap">
                    {getImg(a.image)
                      ? <img src={getImg(a.image)} alt={a.title} className="at-card-img" />
                      : <div className="at-card-img-ph">🏺</div>
                    }
                  </div>

                  {/* Body */}
                  <div className="at-card-body">
                    {/* Level badge */}
                    {a.level && (
                      <span className="at-card-level">{a.level}</span>
                    )}

                    {/* Title */}
                    <h3 className="at-card-title">{a.title}</h3>

                    {/* Description */}
                    <p className="at-card-desc">{a.description}</p>

                    {/* Divider */}
                    <div className="at-card-divider" />

                    {/* Meta */}
                    <div className="at-card-meta">
                      {a.duration && (
                        <div className="at-meta-row">
                          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          <span>{a.duration}</span>
                        </div>
                      )}
                      {a.date && (
                        <div className="at-meta-row">
                          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          <span>{fmtDate(a.date)}</span>
                        </div>
                      )}
                      {!a.date && (
                        <div className="at-meta-row at-meta-soon">
                          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          <span>Bientôt disponible</span>
                        </div>
                      )}
                    </div>

                    {/* Footer : prix + bouton */}
                    <div className="at-card-footer">
                      <div className="at-card-price-wrap">
                        <span className="at-card-price">{a.price} €</span>
                        {a.priceStudent && (
                          <span className="at-card-price-student">Étudiants : {a.priceStudent} €</span>
                        )}
                      </div>
                      {a.placesLeft === 0 ? (
                        <button className="at-btn-soon" disabled>Bientôt disponible</button>
                      ) : !a.date ? (
                        <button className="at-btn-soon" disabled>Bientôt disponible</button>
                      ) : (
                        <button className="at-btn-reserve" onClick={() => handleReserve(a)}>
                          Réserver
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION "Envie de nouvelles idées" ── */}
      <div className="at-ideas">
        <h2 className="at-ideas-title">Envie de nouvelles idées ?</h2>
        <div className="at-ideas-photos">
          {[`${PUB}/atelier1.jpg`, `${PUB}/atelier2.jpg`, `${PUB}/atelier3.jpg`].map((src, i) => (
            <div key={i} className="at-ideas-photo">
              <img src={src} alt={`inspiration ${i+1}`}
                onError={e => { e.target.parentElement.style.background = "#e8e4dc"; e.target.style.display = "none"; }}
              />
            </div>
          ))}
        </div>

        <div className="at-ideas-text-block">
          <div className="at-ideas-text">
            <p>L'atelier de céramique est un espace ouvert à celles et ceux qui souhaitent découvrir la matière, expérimenter et créer de leurs mains.</p>
            <p>Peinture sur céramique, modelage ou initiation à la poterie : chaque atelier est pensé comme un moment accessible, guidé et sans pression.</p>
            <p>Que vous veniez pour la première fois ou que vous ayez déjà pratiqué, l'accompagnement se fait pas à pas, dans une ambiance bienveillante et créative.</p>
          </div>
          <div className="at-ideas-img">
            <img src={`${PUB}/atelier-studio.jpg`} alt="Studio"
              onError={e => { e.target.parentElement.style.background = "#d4c9b8"; e.target.style.display="none"; }}
            />
          </div>
        </div>
      </div>

      {/* ── SECTION "Une expérience pour tous" ── */}
      <div className="at-exp">
        <h2 className="at-exp-title">Une expérience pour tous</h2>
        <div className="at-exp-grid">
          {INFOS.map(info => (
            <div key={info.title} className="at-exp-card">
              <h3 className="at-exp-card-title">{info.title}</h3>
              <p className="at-exp-card-desc">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── GALERIE bas de page ── */}
      <div className="at-gallery">
        {[`${PUB}/g1.jpg`, `${PUB}/g2.png`, `${PUB}/g3.png`, `${PUB}/g4.jpg`].map((src, i) => (
          <div key={i} className="at-gallery-item">
            <img src={src} alt={`galerie ${i+1}`}
              onError={e => { e.target.parentElement.style.background = "#c8c0b0"; e.target.style.display="none"; }}
            />
          </div>
        ))}
      </div>

      {/* ── MODAL RÉSERVATION ── */}
      {selected && (
        <div className="at-overlay" onClick={() => setSelected(null)}>
          <div className="at-modal" onClick={e => e.stopPropagation()}>
            <button className="at-modal-close" onClick={() => setSelected(null)}>✕</button>

            {confirmed ? (
              <div className="at-modal-success">
                <div className="at-modal-success-icon">✅</div>
                <h2>Réservation confirmée !</h2>
                <p>À très bientôt chez Coffee Arts Paris.</p>
              </div>
            ) : (
              <>
                {getImg(selected.image) && (
                  <img src={getImg(selected.image)} alt={selected.title} className="at-modal-img" />
                )}
                <div className="at-modal-body">
                  {selected.level && <span className="at-card-level">{selected.level}</span>}
                  <h2 className="at-modal-title">{selected.title}</h2>
                  <p className="at-modal-desc">{selected.description}</p>
                  <div className="at-modal-info">
                    {selected.duration && (
                      <div className="at-meta-row">
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>{selected.duration}</span>
                      </div>
                    )}
                    {selected.date && (
                      <div className="at-meta-row">
                        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <span>{fmtDate(selected.date)}</span>
                      </div>
                    )}
                    <div className="at-meta-row">
                      <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                      <span>{selected.placesLeft} places restantes</span>
                    </div>
                  </div>
                  <div className="at-modal-footer">
                    <span className="at-modal-price">{selected.price} €</span>
                    <button className="at-btn-reserve at-btn-confirm" onClick={confirmReserve}>
                      Confirmer la réservation
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}