import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminOrders.css";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const STATUS_LABELS = {
  pending:   "En attente",
  confirmed: "Confirmée",
  shipped:   "Expédiée",
  delivered: "Livrée",
};

const STATUS_COLORS = {
  pending:   { bg: "#e8f0fe", color: "#1a6fc4" },
  confirmed: { bg: "#e8f0fe", color: "#1a6fc4" },
  shipped:   { bg: "#fff3e0", color: "#e65100" },
  delivered: { bg: "#e8f5e9", color: "#2e7d32" },
};

export default function AdminOrders() {
  const [orders, setOrders]         = useState([]);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("Tous");
  const [paymentFilter, setPayment] = useState("Tous");
  const [loading, setLoading]       = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    load();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Supprimer cette commande ?")) return;
    await api.delete(`/orders/${id}`);
    load();
  };

  const exportCSV = () => {
    const rows = [
      ["ID","Client","Email","Total","Statut","Paiement","Date"],
      ...orders.map(o => [
        o._id.slice(-8).toUpperCase(),
        o.user?.name || "",
        o.user?.email || "",
        `${o.total}€`,
        STATUS_LABELS[o.status] || o.status,
        o.paymentStatus || "En attente",
        new Date(o.createdAt).toLocaleDateString("fr-FR"),
      ])
    ];
    const csv  = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "commandes.csv"; a.click();
  };

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchSearch =
      o.user?.name?.toLowerCase().includes(q) ||
      o.user?.email?.toLowerCase().includes(q) ||
      o._id.toLowerCase().includes(q);
    const matchStatus  = statusFilter  === "Tous" || o.status === statusFilter;
    const matchPayment = paymentFilter === "Tous" ||
      (paymentFilter === "Payé"      && o.paymentStatus === "Payé") ||
      (paymentFilter === "En attente" && !o.paymentStatus);
    return matchSearch && matchStatus && matchPayment;
  });

  return (
    <div className="co-page">

      {/* ── Header ── */}
      <h1 className="co-title">Commandes</h1>
      <p className="co-sub">Gérez les commandes en ligne</p>

      {/* ── Filters card ── */}
      <div className="co-filters">
        {/* Recherche */}
        <div className="co-fg co-fg-lg">
          <span className="co-flabel">Recherche</span>
          <div className="co-input-wrap">
            <svg viewBox="0 0 24 24" className="co-input-ico">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Nom, email, ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Statut */}
        <div className="co-fg">
          <span className="co-flabel">Statut</span>
          <div className="co-sel-wrap">
            <select value={statusFilter} onChange={e => setStatus(e.target.value)}>
              <option value="Tous">Tous</option>
              {Object.entries(STATUS_LABELS).map(([v,l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="co-sel-chev">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Paiement */}
        <div className="co-fg">
          <span className="co-flabel">Paiement</span>
          <div className="co-sel-wrap">
            <select value={paymentFilter} onChange={e => setPayment(e.target.value)}>
              {["Tous","Payé","En attente","Remboursé"].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="co-sel-chev">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="co-filter-btns">
          <button className="co-btn-sync" onClick={load}>
            <svg viewBox="0 0 24 24">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            Sync Paiements
          </button>
          <button className="co-btn-export" onClick={exportCSV}>
            <svg viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
          <button className="co-btn-refresh" onClick={load} title="Rafraîchir">
            <svg viewBox="0 0 24 24">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="co-table-card">
        {loading ? (
          <div className="co-empty">Chargement...</div>
        ) : (
          <table className="co-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Paiement</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="co-empty">Aucune commande trouvée</td>
                </tr>
              ) : filtered.map(o => {
                const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
                return (
                  <tr key={o._id}>

                    {/* ID */}
                    <td className="co-cell-id">
                      {o._id.slice(-8).toLowerCase()}
                    </td>

                    {/* Client */}
                    <td>
                      <div className="co-client-name">{o.user?.name || "—"}</div>
                      <div className="co-client-email">{o.user?.email || ""}</div>
                    </td>

                    {/* Total */}
                    <td className="co-cell-total">{o.total?.toFixed(2)}€</td>

                    {/* Statut — badge + select invisible par-dessus */}
                    <td>
                      <div className="co-status-cell">
                        <span
                          className="co-badge"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {STATUS_LABELS[o.status] || o.status}
                        </span>
                        <div className="co-badge-chev-wrap">
                          <svg viewBox="0 0 24 24" className="co-badge-chev">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                          <select
                            value={o.status}
                            onChange={e => updateStatus(o._id, e.target.value)}
                            className="co-badge-select"
                          >
                            {Object.entries(STATUS_LABELS).map(([v,l]) => (
                              <option key={v} value={v}>{l}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>

                    {/* Paiement */}
                    <td className="co-cell-payment">
                      {o.paymentStatus || "En attente"}
                    </td>

                    {/* Date */}
                    <td className="co-cell-date">
                      {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="co-actions">
                        <button className="co-act" title="Voir">
                          <svg viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button className="co-act" title="Détails">
                          <svg viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                          </svg>
                        </button>
                        <button
                          className="co-act co-act-del"
                          title="Supprimer"
                          onClick={() => deleteOrder(o._id)}
                        >
                          <svg viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}