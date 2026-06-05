import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AdminBlogs.css";

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const emptyForm = { title: "", content: "", image: "", author: "" };

export default function AdminBlogs() {
  const [blogs, setBlogs]       = useState([]);
  const [search, setSearch]     = useState("");
  const [form, setForm]         = useState(emptyForm);
  const [editingId, setEditing] = useState(null);
  const [showModal, setModal]   = useState(false);
  const [uploading, setUp]      = useState(false);
  const fileRef                 = useRef();

  const load = async () => {
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data);
    } catch { setBlogs([]); }
  };

  useEffect(() => { load(); }, []);

  /* ── Upload image Cloudinary ── */
  const handleImageUpload = async (file) => {
  setUp(true);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`,
      data
    );
    setForm(f => ({ ...f, image: res.data.secure_url }));
  } catch (err) {
    console.error(err.response?.data);
    alert("Erreur Cloudinary — vérifie ton cloud name et preset");
  } finally { setUp(false); }
};
  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/blogs/${editingId}`, form, { headers: h() });
      } else {
        await axios.post(`${API}/blogs`, form, { headers: h() });
      }
      setForm(emptyForm); setEditing(null); setModal(false);
      load();
    } catch (err) { alert(err.response?.data?.message || "Erreur"); }
  };

  const handleEdit = (b) => {
    setForm({ title: b.title, content: b.content, image: b.image || "", author: b.author || "" });
    setEditing(b._id);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    await axios.delete(`${API}/blogs/${id}`, { headers: h() });
    load();
  };

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blg-page">

      {/* Header */}
      <div className="blg-header">
        <div>
          <h1>Blogs</h1>
          <p>Créer, modifier et supprimer des articles de blog</p>
        </div>
        <button className="blg-btn-new" onClick={() => { setForm(emptyForm); setEditing(null); setModal(true); }}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nouveau blog
        </button>
      </div>

      {/* Search */}
      <div className="blg-search-wrap">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Rechercher un blog..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="blg-empty">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <p>Aucun article trouvé</p>
        </div>
      ) : (
        <div className="blg-grid">
          {filtered.map(b => (
            <div className="blg-card" key={b._id}>
              {/* Image */}
              <div className="blg-card-img-wrap">
                {b.image
                  ? <img src={b.image} alt={b.title} className="blg-card-img" />
                  : <div className="blg-card-img-placeholder">📝</div>
                }
                {/* Actions overlay */}
                <div className="blg-card-actions">
                  <button className="blg-act-btn" onClick={() => handleEdit(b)} title="Modifier">
                    <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="blg-act-btn blg-act-del" onClick={() => handleDelete(b._id)} title="Supprimer">
                    <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="blg-card-body">
                <h3 className="blg-card-title">{b.title}</h3>
                <p className="blg-card-excerpt">
                  {b.content?.slice(0, 120)}{b.content?.length > 120 ? "..." : ""}
                </p>
              </div>

              {/* Footer */}
              <div className="blg-card-footer">
                <button className="blg-view-btn" title="Voir">
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="blg-overlay" onClick={() => setModal(false)}>
          <div className="blg-modal" onClick={e => e.stopPropagation()}>
            <div className="blg-modal-header">
              <h2>{editingId ? "Modifier l'article" : "Nouvel article"}</h2>
              <button className="blg-modal-close" onClick={() => setModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="blg-form">

              <div className="blg-form-group">
                <label>Titre *</label>
                <input
                  type="text"
                  placeholder="Titre de l'article"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="blg-form-group">
                <label>Auteur</label>
                <input
                  type="text"
                  placeholder="Nom de l'auteur"
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="blg-form-group">
                <label>Image</label>
                <div className="blg-img-upload-area"
                  onClick={() => fileRef.current.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleImageUpload(e.dataTransfer.files[0]); }}
                >
                  {form.image ? (
                    <img src={form.image} alt="preview" className="blg-img-preview" />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span>{uploading ? "Upload en cours..." : "Cliquez ou glissez une image"}</span>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => handleImageUpload(e.target.files[0])}
                  />
                </div>
                {form.image && (
                  <button type="button" className="blg-img-remove" onClick={() => setForm({ ...form, image: "" })}>
                    Supprimer l'image
                  </button>
                )}
              </div>

              <div className="blg-form-group">
                <label>Contenu *</label>
                <textarea
                  placeholder="Contenu de l'article..."
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  required
                  rows={6}
                />
              </div>

              <div className="blg-modal-actions">
                <button type="button" className="blg-btn-cancel" onClick={() => setModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="blg-btn-submit" disabled={uploading}>
                  {editingId ? "Enregistrer" : "Publier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}