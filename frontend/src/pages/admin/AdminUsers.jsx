import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUsers.css";

const API = process.env.REACT_APP_API_URL;
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get(`${API}/users`, { headers: headers() });
    setUsers(res.data);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    await axios.put(`${API}/users/${id}`, { role }, { headers: headers() });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      await axios.delete(`${API}/users/${id}`, { headers: headers() });
      loadUsers();
    }
  };

  return (
    <div className="users-wrapper">
      <h2>👥 Gestion Utilisateurs</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(u._id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
