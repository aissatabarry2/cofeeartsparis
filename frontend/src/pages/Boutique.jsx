import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Boutique.css";

const API = process.env.REACT_APP_API_URL;
const TABS = ["Céramique", "Goodies / Lifestyle", "Cartes cadeaux"];
const SUB_CATS = ["Tous", "Cup", "Casquette", "Chaussettes", "T-shirt", "Tote bag"];

export default function Boutique() {
  const [products, setProducts] = useState([]);
  const [activeTab, setTab]     = useState("Goodies / Lifestyle");
  const [subCat, setSubCat]     = useState("Tous");
  const [detail, setDetail]     = useState(null); // page détail
  const [qty, setQty]           = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { cart, addToCart, updateQty, removeFromCart, clearCart, total, count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]));
  }, []);

  const getImg = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${API?.replace("/api", "")}/uploads/${img}`;
  };

  const filtered = products.filter(p => {
    const matchTab =
      activeTab === "Céramique"           ? p.type === "ceramique" || p.category === "Céramique" :
      activeTab === "Goodies / Lifestyle" ? p.type === "goodies"   || ["Cup","Casquette","Chaussettes","T-shirt","Tote bag"].includes(p.category) :
      activeTab === "Cartes cadeaux"      ? p.type === "carte"      || p.category === "Carte cadeau" :
      true;
    const matchSub = subCat === "Tous" || p.category === subCat;
    return matchTab && matchSub;
  });

  const tabLabel = () => {
    if (activeTab === "Céramique")          return { title: "Céramique",          sub: "Découvrez nos créations en céramique artisanale" };
    if (activeTab === "Goodies / Lifestyle") return { title: "Goodies / Lifestyle", sub: "Découvrez nos accessoires et objets lifestyle" };
    return { title: "Cartes cadeaux", sub: "Offrez une expérience Coffee Arts Paris" };
  };

  const toggleWish = (id) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Connectez-vous pour commander"); return; }
    try {
      await axios.post(`${API}/orders`, {
        items: cart.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.qty })),
        total
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert("✅ Commande passée !");
      clearCart(); setShowCart(false);
    } catch { alert("Erreur lors de la commande"); }
  };

  /* ──────────── PAGE DÉTAIL ──────────── */
  if (detail) {
    return (
      <div className="bq-detail-page">
        <button className="bq-detail-back" onClick={() => { setDetail(null); setQty(1); }}>
          ← Retour à la boutique
        </button>

        <div className="bq-detail-layout">
          {/* Image */}
          <div className="bq-detail-img-col">
            <div className="bq-detail-img-wrap">
              {getImg(detail.image)
                ? <img src={getImg(detail.image)} alt={detail.name} />
                : <div className="bq-detail-img-ph">🛍️</div>
              }
            </div>
            <button
              className={`bq-detail-wish${wishlist.includes(detail._id) ? " active" : ""}`}
              onClick={() => toggleWish(detail._id)}
            >
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
          </div>

          {/* Infos */}
          <div className="bq-detail-info-col">
            {detail.category && <span className="bq-detail-tag">{detail.category}</span>}
            <h1 className="bq-detail-name">{detail.name}</h1>
            <p className="bq-detail-price">{detail.price} €</p>
            <p className="bq-detail-desc">{detail.description}</p>

            {/* Couleurs si dispo */}
            {detail.colors?.length > 0 && (
              <div className="bq-detail-colors">
                <span>Couleurs :</span>
                {detail.colors.map(c => (
                  <span key={c} className="bq-detail-color-tag">{c}</span>
                ))}
              </div>
            )}

            {/* Quantité */}
            <div className="bq-detail-qty">
              <span>Quantité :</span>
              <div className="bq-qty-ctrl">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Ajouter au panier */}
            <button
              className="bq-detail-add"
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(detail);
                setShowCart(true);
              }}
            >
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Cart drawer sur page détail aussi */}
        {showCart && (
          <div className="bq-overlay" onClick={() => setShowCart(false)}>
            <div className="bq-cart-drawer" onClick={e => e.stopPropagation()}>
              <div className="bq-cart-header">
                <h2>🛒 Mon panier</h2>
                <button className="bq-modal-close" onClick={() => setShowCart(false)}>✕</button>
              </div>
              {cart.length === 0 ? (
                <p className="bq-cart-empty">Votre panier est vide.</p>
              ) : (
                <>
                  <div className="bq-cart-items">
                    {cart.map(item => (
                      <div key={item._id} className="bq-cart-item">
                        <div className="bq-cart-item-info">
                          <span className="bq-cart-item-name">{item.name}</span>
                          <span className="bq-cart-item-price">{item.price}€</span>
                        </div>
                        <div className="bq-cart-item-controls">
                          <button onClick={() => updateQty(item._id, (item.qty||1)-1)}>−</button>
                          <span>{item.qty||1}</span>
                          <button onClick={() => updateQty(item._id, (item.qty||1)+1)}>+</button>
                          <button className="bq-cart-item-del" onClick={() => removeFromCart(item._id)}>🗑</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bq-cart-footer">
                    <div className="bq-cart-total"><span>Total</span><strong>{total.toFixed(2)}€</strong></div>
                    <button className="bq-btn-order" onClick={handleOrder}>Commander — Paiement simulé</button>
                    <button className="bq-btn-clear" onClick={clearCart}>Vider le panier</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ──────────── PAGE LISTE ──────────── */
  return (
    <>
    <div className="bq-page">

      {/* Hero */}
      <div className="bq-hero">
        <h1 className="bq-hero-title">La <em>boutique</em></h1>
        <p className="bq-hero-sub">
          Des pièces choisies avec soin, à utiliser au quotidien ou à offrir,<br />
          dans l'esprit du café et de l'atelier.
        </p>
      </div>

      <div className="bq-divider" />

      {/* Tabs */}
      <div className="bq-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`bq-tab${activeTab === t ? " bq-tab-active" : ""}`}
            onClick={() => { setTab(t); setSubCat("Tous"); }}
          >{t}</button>
        ))}
      </div>

      <div className="bq-divider" />

      {/* Sous-cats */}
      {activeTab === "Goodies / Lifestyle" && (
        <div className="bq-subcats">
          {SUB_CATS.map(s => (
            <button
              key={s}
              className={`bq-subcat${subCat === s ? " bq-subcat-active" : ""}`}
              onClick={() => setSubCat(s)}
            >{s}</button>
          ))}
        </div>
      )}

      {/* Section title */}
      <div className="bq-section-title">
        <h2>{tabLabel().title}</h2>
        <p>{tabLabel().sub}</p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bq-empty">Aucun produit dans cette catégorie.</div>
      ) : (
        <div className="bq-grid">
          {filtered.map(p => (
            <div className="bq-card" key={p._id}>

              {/* Image + wish + cart */}
              <div className="bq-card-img-wrap">
                {getImg(p.image)
                  ? <img src={getImg(p.image)} alt={p.name} className="bq-card-img" />
                  : <div className="bq-card-img-ph">🛍️</div>
                }
                <button
                  className={`bq-card-wish${wishlist.includes(p._id) ? " active" : ""}`}
                  onClick={e => { e.stopPropagation(); toggleWish(p._id); }}
                >
                  <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
                <button
                  className="bq-card-cart-ico"
                  onClick={e => { e.stopPropagation(); addToCart(p); }}
                >
                  <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                </button>
              </div>

              {/* Body */}
              <div className="bq-card-body">
                <div className="bq-card-top">
                  <h3 className="bq-card-name">{p.name}</h3>
                  <span className="bq-card-price">{p.price} €</span>
                </div>
                {/* Couleurs */}
                {p.colors?.length > 0 && (
                  <div className="bq-card-colors">
                    <span>Couleurs :</span>
                    {p.colors.map(c => <span key={c} className="bq-color-tag">{c}</span>)}
                  </div>
                )}
                <button
                  className="bq-card-detail-btn"
                  onClick={() => { setDetail(p); setQty(1); }}
                >
                  Voir le détail
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      {/* Section Commandes sur mesure */}
      <div className="bq-custom-orders">
        <div className="bq-custom-card">
          <h2>Commandes sur mesure</h2>
          <p>
            Vous avez un projet particulier, une envie spécifique ou un besoin pour un événement ?<br />
            Nous étudions les demandes au cas par cas, selon les possibilités de l'atelier.
          </p>
          <button className="bq-custom-btn" onClick={() => navigate("/contact")}>
            Nous contacter
          </button>
        </div>
      </div>

      {/* FAB */}
      {count > 0 && (
        <button className="bq-cart-fab" onClick={() => setShowCart(true)}>
          🛒 <span>{count}</span>
        </button>
      )}

      {/* Cart drawer */}
      {showCart && (
        <div className="bq-overlay" onClick={() => setShowCart(false)}>
          <div className="bq-cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="bq-cart-header">
              <h2>🛒 Mon panier</h2>
              <button className="bq-modal-close" onClick={() => setShowCart(false)}>✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="bq-cart-empty">Votre panier est vide.</p>
            ) : (
              <>
                <div className="bq-cart-items">
                  {cart.map(item => (
                    <div key={item._id} className="bq-cart-item">
                      <div className="bq-cart-item-info">
                        <span className="bq-cart-item-name">{item.name}</span>
                        <span className="bq-cart-item-price">{item.price}€</span>
                      </div>
                      <div className="bq-cart-item-controls">
                        <button onClick={() => updateQty(item._id, (item.qty||1)-1)}>−</button>
                        <span>{item.qty||1}</span>
                        <button onClick={() => updateQty(item._id, (item.qty||1)+1)}>+</button>
                        <button className="bq-cart-item-del" onClick={() => removeFromCart(item._id)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bq-cart-footer">
                  <div className="bq-cart-total"><span>Total</span><strong>{total.toFixed(2)}€</strong></div>
                  <button className="bq-btn-order" onClick={handleOrder}>Commander — Paiement simulé</button>
                  <button className="bq-btn-clear" onClick={clearCart}>Vider le panier</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}