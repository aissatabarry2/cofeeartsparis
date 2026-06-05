import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUsers.css";

const API = process.env.REACT_APP_API_URL;
const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function AdminUsers() {
  const [users, setUsers]   = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [loading, setLoad]  = useState(true);

  const load = async () => {
    try {
      const res = await axios.get(`${API}/users`, { headers: h() });
      setUsers(res.data);
    } catch { setUsers([]); }
    finally { setLoad(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    await axios.delete(`${API}/users/${id}`, { headers: h() });
    load();
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q);
    const matchRole = filter === "Tous" || u.role === filter;
    return matchSearch && matchRole;
  });

  const initials = (name) =>
    name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  return (
    <div className="usr-page">

      {/* Header */}
      <div className="usr-header">
        <div>
          <h1>Utilisateurs</h1>
          <p>Gérer les utilisateurs et leurs rôles</p>
        </div>
        <div className="usr-count-badge">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          {users.length}
        </div>
      </div>

      {/* Filters */}
      <div className="usr-filters">
        <div className="usr-search">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="usr-select-wrap">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="Tous">Tous les rôles</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <svg className="usr-chev" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {/* Table */}
      <div className="usr-table-card">
        {loading ? (
          <div className="usr-empty">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="usr-empty">Aucun utilisateur trouvé</div>
        ) : (
          <table className="usr-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u._id}>
                  <td>
                    <div className="usr-cell-user">
                      <div className="usr-avatar">{initials(u.name)}</div>
                      <span className="usr-name">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="usr-email">{u.email}</td>
                  <td>
                    <span className={`usr-badge ${u.role === "admin" ? "usr-badge-admin" : "usr-badge-client"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="usr-date">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>
                  <td>
                    <div className="usr-actions">
                      <button
                        className="usr-act-btn"
                        title="Modifier"
                        onClick={() => alert("Fonctionnalité à implémenter")}
                      >
                        <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      {u.role !== "admin" && (
                        <button
                          className="usr-act-btn usr-act-del"
                          title="Supprimer"
                          onClick={() => handleDelete(u._id)}
                        >
                          <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}