import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminContacts.css";

const API = process.env.REACT_APP_API_URL;
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const res = await axios.get(`${API}/contact`, { headers: headers() });
    setContacts(res.data);
  };

  useEffect(() => { loadContacts(); }, []);

  return (
    <div className="contacts-wrapper">
      <h2>✉️ Messages de Contact</h2>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
              <td>{new Date(c.createdAt).toLocaleDateString("fr-FR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
