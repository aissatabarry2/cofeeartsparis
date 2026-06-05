import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AdminProducts.css";

const API = process.env.REACT_APP_API_URL;
const CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const CATEGORIES = ["Toutes les catégories", "Cup", "Chaussettes", "Tote bag", "Casquette", "Tee-shirt", "Accessoire"];
const empty = { name: "", description: "", price: "", category: "", image: "", stock: "" };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch]     = useState("");
  const [catFilter, setCat]     = useState("Toutes les catégories");
  const [form, setForm]         = useState(empty);
  const [editingId, setEditing] = useState(null);
  const [showModal, setModal]   = useState(false);
  const [uploading, setUp]      = useState(false);
  const fileRef                 = useRef();

  const load = async () => {
  try {
    const res = await axios.get(`${API}/products`, { headers: h() });
    // Filtre côté frontend — garde seulement les produits goodies
    const goodiesCategories = ["Cup", "Chaussettes", "Tote bag", "Casquette", "Tee-shirt", "Accessoire"];
    setProducts(res.data.filter(p => goodiesCategories.includes(p.category)));
  } catch { setProducts([]); }
};


  useEffect(() => { load(); }, []);

  /* ── Cloudinary upload ── */
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUp(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", PRESET);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, data
      );
      setForm(f => ({ ...f, image: res.data.secure_url }));
    } catch (err) {
      alert("Erreur upload image — vérifie ton cloud name et preset Cloudinary");
    } finally { setUp(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock), type: "goodies" };
      if (editingId) {
        await axios.put(`${API}/products/${editingId}`, payload, { headers: h() });
      } else {
        await axios.post(`${API}/products`, payload, { headers: h() });
      }
      setForm(empty); setEditing(null); setModal(false);
      load();
    } catch (err) { alert(err.response?.data?.message || "Erreur"); }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description || "", price: p.price, category: p.category || "", image: p.image || "", stock: p.stock || "" });
    setEditing(p._id);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    await axios.delete(`${API}/products/${id}`, { headers: h() });
    load();
  };

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    const matchCat = catFilter === "Toutes les catégories" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const getImg = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${API?.replace("/api", "")}/uploads/${img}`;
  };

  return (
    <div className="gd-page">

      {/* Header */}
      <div className="gd-header">
        <div>
          <h1>Goodies / Lifestyle</h1>
          <p>Gérez les goodies, tote bags et affiches / prints</p>
        </div>
        <button className="gd-btn-new" onClick={() => { setForm(empty); setEditing(null); setModal(true); }}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nouveau produit
        </button>
      </div>

      {/* Filters */}
      <div className="gd-filters">
        <input
          type="text"
          className="gd-search"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="gd-select-wrap">
          <select value={catFilter} onChange={e => setCat(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg className="gd-chev" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="gd-empty">
          <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
          <p>Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="gd-grid">
          {filtered.map(p => (
            <div className="gd-card" key={p._id}>
              {/* Image */}
              <div className="gd-card-img-wrap">
                {getImg(p.image)
                  ? <img src={getImg(p.image)} alt={p.name} className="gd-card-img" />
                  : <div className="gd-card-img-ph">🛍️</div>
                }
              </div>

              {/* Body */}
              <div className="gd-card-body">
                <div className="gd-card-title-row">
                  <h3 className="gd-card-name">{p.name}</h3>
                  <span className="gd-card-price">{p.price}€</span>
                </div>
                {p.category && (
                  <span className="gd-card-tag">{p.category}</span>
                )}
                <p className="gd-card-desc">{p.description}</p>
              </div>

              {/* Actions */}
              <div className="gd-card-actions">
                <button className="gd-btn-edit" onClick={() => handleEdit(p)}>
                  <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Modifier
                </button>
                <button className="gd-btn-del" onClick={() => handleDelete(p._id)}>
                  <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL ── */}
      {showModal && (
        <div className="gd-overlay" onClick={() => setModal(false)}>
          <div className="gd-modal" onClick={e => e.stopPropagation()}>
            <div className="gd-modal-header">
              <h2>{editingId ? "Modifier le produit" : "Nouveau produit"}</h2>
              <button className="gd-modal-close" onClick={() => setModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="gd-form">

              {/* Image upload */}
              <div className="gd-fg">
                <label>Image du produit</label>
                <div
                  className="gd-upload-area"
                  onClick={() => fileRef.current.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleImageUpload(e.dataTransfer.files[0]); }}
                >
                  {form.image ? (
                    <img src={form.image} alt="preview" className="gd-upload-preview" />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span>{uploading ? "Upload en cours..." : "Cliquez ou glissez une image"}</span>
                    </>
                  )}
                  <input
                    ref={fileRef} type="file" accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => handleImageUpload(e.target.files[0])}
                  />
                </div>
                {form.image && (
                  <button type="button" className="gd-remove-img" onClick={() => setForm(f => ({ ...f, image: "" }))}>
                    Supprimer l'image
                  </button>
                )}
              </div>

              <div className="gd-form-row">
                <div className="gd-fg">
                  <label>Nom *</label>
                  <input placeholder="Nom du produit" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="gd-fg">
                  <label>Prix (€) *</label>
                  <input type="number" placeholder="0" value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })} required min="0" step="0.01" />
                </div>
              </div>

              <div className="gd-form-row">
                <div className="gd-fg">
                  <label>Catégorie</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="">— Choisir —</option>
                    {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="gd-fg">
                  <label>Stock</label>
                  <input type="number" placeholder="0" value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })} min="0" />
                </div>
              </div>

              <div className="gd-fg">
                <label>Description</label>
                <textarea placeholder="Description du produit..." value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })} rows={4} />
              </div>

              <div className="gd-modal-actions">
                <button type="button" className="gd-btn-cancel" onClick={() => setModal(false)}>Annuler</button>
                <button type="submit" className="gd-btn-submit" disabled={uploading}>
                  {uploading ? "Upload..." : editingId ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}