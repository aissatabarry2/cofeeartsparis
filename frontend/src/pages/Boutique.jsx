import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./Boutique.css";

const API = process.env.REACT_APP_API_URL;

const TABS = ["Céramique", "Goodies / Lifestyle", "Cartes cadeaux"];
const SUB_CATS = ["Tous", "Cup", "Casquette", "Chaussettes", "T-shirt", "Tote bag"];

export default function Boutique() {
  const [products, setProducts]       = useState([]);
  const [activeTab, setTab]           = useState("Goodies / Lifestyle");
  const [subCat, setSubCat]           = useState("Tous");
  const [selected, setSelected]       = useState(null);
  const [showCart, setShowCart]       = useState(false);
  const { cart, addToCart, updateQty, removeFromCart, clearCart, total, count } = useCart();

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]));
  }, []);

  const filtered = products.filter(p => {
    const matchTab =
      activeTab === "Céramique"          ? p.type === "ceramique" || p.category === "Céramique" :
      activeTab === "Goodies / Lifestyle" ? p.type === "goodies"   || ["Cup","Casquette","Chaussettes","T-shirt","Tote bag"].includes(p.category) :
      activeTab === "Cartes cadeaux"     ? p.type === "carte"      || p.category === "Carte cadeau" :
      true;
    const matchSub = subCat === "Tous" || p.category === subCat;
    return matchTab && matchSub;
  });

  const getImg = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${API?.replace("/api", "")}/uploads/${img}`;
  };

  const tabLabel = () => {
    if (activeTab === "Céramique") return { title: "Céramique", sub: "Découvrez nos créations en céramique artisanale" };
    if (activeTab === "Goodies / Lifestyle") return { title: "Goodies / Lifestyle", sub: "Découvrez nos accessoires et objets lifestyle" };
    return { title: "Cartes cadeaux", sub: "Offrez une expérience Coffee Arts Paris" };
  };

  return (
    <div className="bq-page">

      {/* ── HERO ── */}
      <div className="bq-hero">
        <h1 className="bq-hero-title">La <em>boutique</em></h1>
        <p className="bq-hero-sub">
          Des pièces choisies avec soin, à utiliser au quotidien ou à offrir,<br />
          dans l'esprit du café et de l'atelier.
        </p>
      </div>

      <div className="bq-divider" />

      {/* ── TABS PRINCIPAUX ── */}
      <div className="bq-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`bq-tab${activeTab === t ? " bq-tab-active" : ""}`}
            onClick={() => { setTab(t); setSubCat("Tous"); }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bq-divider" />

      {/* ── SOUS-CATÉGORIES ── */}
      {activeTab === "Goodies / Lifestyle" && (
        <div className="bq-subcats">
          {SUB_CATS.map(s => (
            <button
              key={s}
              className={`bq-subcat${subCat === s ? " bq-subcat-active" : ""}`}
              onClick={() => setSubCat(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── SECTION TITLE ── */}
      <div className="bq-section-title">
        <h2>{tabLabel().title}</h2>
        <p>{tabLabel().sub}</p>
      </div>

      {/* ── PRODUCTS GRID ── */}
      {filtered.length === 0 ? (
        <div className="bq-empty">Aucun produit dans cette catégorie.</div>
      ) : (
        <div className="bq-grid">
          {filtered.map(p => (
            <div className="bq-card" key={p._id} onClick={() => setSelected(p)}>
              <div className="bq-card-img-wrap">
                {getImg(p.image)
                  ? <img src={getImg(p.image)} alt={p.name} className="bq-card-img" />
                  : <div className="bq-card-img-ph">🛍️</div>
                }
              </div>
              <div className="bq-card-body">
                <div className="bq-card-top">
                  <h3 className="bq-card-name">{p.name}</h3>
                  <span className="bq-card-price">{p.price}€</span>
                </div>
                {p.category && <span className="bq-card-tag">{p.category}</span>}
                <p className="bq-card-desc">{p.description?.slice(0, 90)}{p.description?.length > 90 ? "..." : ""}</p>
                <button
                  className="bq-btn-add"
                  onClick={e => { e.stopPropagation(); addToCart(p); }}
                >
                  + Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CART BUTTON FIXE ── */}
      {count > 0 && (
        <button className="bq-cart-fab" onClick={() => setShowCart(true)}>
          🛒 <span>{count}</span>
        </button>
      )}

      {/* ── PRODUCT MODAL ── */}
      {selected && (
        <div className="bq-overlay" onClick={() => setSelected(null)}>
          <div className="bq-product-modal" onClick={e => e.stopPropagation()}>
            <button className="bq-modal-close" onClick={() => setSelected(null)}>✕</button>
            {getImg(selected.image) && (
              <img src={getImg(selected.image)} alt={selected.name} className="bq-modal-img" />
            )}
            <div className="bq-modal-body">
              {selected.category && <span className="bq-card-tag">{selected.category}</span>}
              <h2 className="bq-modal-title">{selected.name}</h2>
              <p className="bq-modal-desc">{selected.description}</p>
              <div className="bq-modal-footer">
                <span className="bq-modal-price">{selected.price}€</span>
                <button
                  className="bq-btn-add"
                  onClick={() => { addToCart(selected); setSelected(null); }}
                >
                  + Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
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
                        <button onClick={() => updateQty(item._id, (item.qty || item.quantity) - 1)}>−</button>
                        <span>{item.qty || item.quantity}</span>
                        <button onClick={() => updateQty(item._id, (item.qty || item.quantity) + 1)}>+</button>
                        <button className="bq-cart-item-del" onClick={() => removeFromCart(item._id)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bq-cart-footer">
                  <div className="bq-cart-total">
                    <span>Total</span>
                    <strong>{total.toFixed(2)}€</strong>
                  </div>
                  <button className="bq-btn-order" 
                  onClick={async () => {
  const token = localStorage.getItem("token");
  if (!token) { alert("Connectez-vous pour commander"); return; }
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/orders`, {
      items: cart.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.qty })),
      total
    }, { headers: { Authorization: `Bearer ${token}` } });
    alert("✅ Commande passée !");
    clearCart();
    setShowCart(false);
  } catch { alert("Erreur lors de la commande"); }
}} >
                    Commander — Paiement simulé
                  </button>
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