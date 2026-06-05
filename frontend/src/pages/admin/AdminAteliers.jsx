import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAteliers.css";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const DURATIONS = ["30 min", "1h", "1h30", "2h", "Autre"];
const LEVELS    = ["Débutant", "Intermédiaire", "Avancé"];
const STATUTS   = ["Actif", "Inactif", "Complet"];
const CATS      = ["Standard", "Iftar Ramadan"];

const EMPTY_FORM = {
  title: "", description: "", level: "Débutant", duration: "2h",
  price: "", studentPrice: "", imageUrl: "", imageFile: null,
  status: "Actif", category: "Standard", places: "", date: ""
};

export default function AdminAteliers() {
  const [ateliers, setAteliers] = useState([]);
  const [tab, setTab]           = useState("Standard");
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [rappels, setRappels]     = useState(true);
  const [saving, setSaving]       = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/ateliers");
      setAteliers(res.data);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = ateliers.filter(a =>
    tab === "Atelier Iftar Ramadan"
      ? a.category === "Iftar Ramadan" || a.type === "iftar"
      : a.category !== "Iftar Ramadan" && a.type !== "iftar"
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (a) => {
    setForm({
      title: a.title || "", description: a.description || "",
      level: a.level || "Débutant", duration: a.duration || "2h",
      price: a.price || "", studentPrice: a.studentPrice || "",
      imageUrl: a.image || "", imageFile: null,
      status: a.status || "Actif",
      category: a.category || "Standard",
      places: a.places || "", date: a.date?.slice(0,10) || ""
    });
    setEditingId(a._id);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, imageFile: file, imageUrl: "" }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.price) return alert("Titre et prix sont requis");
    setSaving(true);
    try {
      let imageUrl = form.imageUrl;

      // Upload image si fichier sélectionné
      if (form.imageFile) {
  const data = new FormData();
  data.append("file", form.imageFile);
  data.append("upload_preset", "coffeeart"); // ton preset Cloudinary
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dx4frr3ak/image/upload",
    data
  );
  imageUrl = res.data.secure_url;
}


      const payload = {
        title: form.title, description: form.description,
        level: form.level, duration: form.duration,
        price: Number(form.price),
        studentPrice: form.studentPrice ? Number(form.studentPrice) : undefined,
        image: imageUrl, status: form.status, category: form.category,
        places: form.places ? Number(form.places) : undefined,
        placesLeft: form.places ? Number(form.places) : undefined,
        date: form.date || undefined,
        type: form.category === "Iftar Ramadan" ? "iftar" : "standard"
      };

      if (editingId) {
        await api.put(`/ateliers/${editingId}`, payload);
      } else {
        await api.post("/ateliers", payload);
      }
      setShowModal(false);
      load();
    } catch(e) {
      alert(e.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet atelier ?")) return;
    await api.delete(`/ateliers/${id}`);
    load();
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric", month: "short", year: "numeric"
  }) : "—";

  return (
    <div className="aa-page">

      {/* ── TABS ── */}
      <div className="aa-tabs">
        {["Ateliers Standards", "Atelier Iftar Ramadan"].map(t => (
          <button
            key={t}
            className={`aa-tab ${tab === t || (t === "Ateliers Standards" && tab === "Standard") ? "active" : ""}`}
            onClick={() => setTab(t === "Ateliers Standards" ? "Standard" : "Atelier Iftar Ramadan")}
          >
            {t === "Ateliers Standards"
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
            {t}
          </button>
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className="aa-header">
        <div>
          <h1 className="aa-title">Ateliers</h1>
          <p className="aa-sub">Gérez les ateliers céramique</p>
        </div>
        <div className="aa-actions">
          <button className="aa-btn aa-btn-orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Modifier l'ordre
          </button>
          <button className="aa-btn aa-btn-green" onClick={load}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            Synchroniser Sheets
          </button>
          <button
            className={`aa-btn ${rappels ? "aa-btn-blue" : "aa-btn-gray"}`}
            onClick={() => setRappels(r => !r)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            Rappels J-10 : {rappels ? "ON" : "OFF"}
          </button>
          <button className="aa-btn aa-btn-dark" onClick={openCreate}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nouvel atelier
          </button>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="aa-card">
        {loading ? (
          <div className="aa-empty">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="aa-empty">Aucun atelier trouvé</div>
        ) : (
          <table className="aa-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Date</th>
                <th>Niveau</th>
                <th>Durée</th>
                <th>Prix</th>
                <th>Places</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a._id}>
                  <td className="aa-cell-title">{a.title}</td>
                  <td className="aa-cell-date">{formatDate(a.date)}</td>
                  <td><span className="aa-level">{a.level || "—"}</span></td>
                  <td>{a.duration || "—"}</td>
                  <td className="aa-cell-price">{a.price}€</td>
                  <td>{a.placesLeft ?? a.places ?? "—"}/{a.places ?? "—"}</td>
                  <td>
                    <span className={`aa-status aa-status-${(a.status||"actif").toLowerCase()}`}>
                      {a.status || "Actif"}
                    </span>
                  </td>
                  <td>
                    <div className="aa-row-actions">
                      <button className="aa-act" onClick={() => openEdit(a)} title="Modifier">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="aa-act aa-act-del" onClick={() => handleDelete(a._id)} title="Supprimer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── MODAL ── */}
      {showModal && (
        <div className="aa-overlay" onClick={() => setShowModal(false)}>
          <div className="aa-modal" onClick={e => e.stopPropagation()}>

            <div className="aa-modal-header">
              <h2>{editingId ? "Modifier l'atelier" : "Nouvel atelier"}</h2>
              <button className="aa-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="aa-modal-body">

              {/* Titre */}
              <div className="aa-fg">
                <label>Titre *</label>
                <input type="text" value={form.title}
                  onChange={e => setForm(f => ({...f, title: e.target.value}))} />
              </div>

              {/* Description */}
              <div className="aa-fg">
                <label>Description</label>
                <textarea rows="4" value={form.description}
                  onChange={e => setForm(f => ({...f, description: e.target.value}))} />
              </div>

              {/* Niveau + Durée */}
              <div className="aa-fg-row">
                <div className="aa-fg">
                  <label>Niveau</label>
                  <div className="aa-select-wrap">
                    <select value={form.level} onChange={e => setForm(f => ({...f, level: e.target.value}))}>
                      {LEVELS.map(l => <option key={l}>{l}</option>)}
                    </select>
                    <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="aa-fg">
                  <label>Durée</label>
                  <div className="aa-duration-btns">
                    {DURATIONS.map(d => (
                      <button
                        key={d}
                        type="button"
                        className={`aa-dur-btn ${form.duration === d ? "active" : ""}`}
                        onClick={() => setForm(f => ({...f, duration: d}))}
                      >{d}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prix + Tarif étudiant */}
              <div className="aa-fg-row">
                <div className="aa-fg">
                  <label>Prix (€) *</label>
                  <input type="number" value={form.price}
                    onChange={e => setForm(f => ({...f, price: e.target.value}))} />
                </div>
                <div className="aa-fg">
                  <label>Tarif étudiant (€)</label>
                  <input type="number" placeholder="Optionnel" value={form.studentPrice}
                    onChange={e => setForm(f => ({...f, studentPrice: e.target.value}))} />
                </div>
              </div>

              {/* Date + Places */}
              <div className="aa-fg-row">
                <div className="aa-fg">
                  <label>Date</label>
                  <input type="date" value={form.date}
                    onChange={e => setForm(f => ({...f, date: e.target.value}))} />
                </div>
                <div className="aa-fg">
                  <label>Nombre de places</label>
                  <input type="number" value={form.places}
                    onChange={e => setForm(f => ({...f, places: e.target.value}))} />
                </div>
              </div>

              {/* Image */}
              <div className="aa-fg">
                <label>Image</label>
                <label className="aa-upload-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {form.imageFile ? form.imageFile.name : "Choisir une image"}
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{display:"none"}} />
                </label>
                <div className="aa-or">ou</div>
                <input type="text" placeholder="URL de l'image (optionnel si vous uploadez un fichier)"
                  value={form.imageUrl}
                  onChange={e => setForm(f => ({...f, imageUrl: e.target.value, imageFile: null}))} />
              </div>

              {/* Statut + Catégorie */}
              <div className="aa-fg-row">
                <div className="aa-fg">
                  <label>Statut</label>
                  <div className="aa-select-wrap">
                    <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                      {STATUTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="aa-fg">
                  <label>Catégorie</label>
                  <div className="aa-select-wrap">
                    <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                      {CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="aa-modal-footer">
              <button className="aa-modal-submit" onClick={handleSubmit} disabled={saving}>
                {saving ? "Enregistrement..." : editingId ? "Modifier" : "Créer"}
              </button>
              <button className="aa-modal-cancel" onClick={() => setShowModal(false)}>Annuler</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}