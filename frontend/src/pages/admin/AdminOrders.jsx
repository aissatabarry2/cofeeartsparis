import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminOrders.css";

const API = process.env.REACT_APP_API_URL;
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
const statusColors = {
  pending: "#f39c12",
  confirmed: "#3498db",
  shipped: "#9b59b6",
  delivered: "#27ae60",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [paymentFilter, setPaymentFilter] = useState("Tous");

  const loadOrders = async () => {
    const res = await axios.get(`${API}/orders`, { headers: headers() });
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/orders/${id}`, { status }, { headers: headers() });
    loadOrders();
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o._id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Tous" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="orders-wrapper">
      <h2 className="orders-title">Commandes</h2>
      <p className="orders-subtitle">Gérez les commandes en ligne</p>

      {/* Filtres */}
      <div className="orders-filters">
        <input
          type="text"
          placeholder="Nom, email, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {["Tous", "pending", "confirmed", "shipped", "delivered"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
          {["Tous", "Payé", "Non payé"].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <div className="orders-actions">
          <button className="sync-btn">🔄 Sync Paiements</button>
          <button className="export-btn">⬇️ Export CSV</button>
        </div>
      </div>

      {/* Tableau */}
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((o) => (
                <tr key={o._id}>
                  <td>#{o._id.slice(-6).toUpperCase()}</td>
                  <td>
                    <strong>{o.user?.name}</strong>
                    <br />
                    <span className="email">{o.user?.email}</span>
                  </td>
                  <td className="total">{o.total}€</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      style={{
                        background: statusColors[o.status],
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.3rem 0.6rem",
                      }}
                    >
                      {["pending", "confirmed", "shipped", "delivered"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td>
                    <button className="view-btn">👁️ Voir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty">
                  Aucune commande trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
