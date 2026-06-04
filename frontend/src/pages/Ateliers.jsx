import { useState, useEffect } from "react";
import axios from "axios";
import "./Ateliers.css";

const API = process.env.REACT_APP_API_URL;

export default function Ateliers() {
  const [ateliers, setAteliers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    axios.get(`${API}/ateliers`).then(res => setAteliers(res.data));
  }, []);

  const handleReserve = async (id) => {
    try {
      await axios.post(`${API}/orders`, { atelierId: id });
      setReserved(true);
      setTimeout(() => setReserved(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ateliers-wrapper">
      <h1>🎨 Nos Ateliers</h1>

      {/* Liste des ateliers */}
      <div className="ateliers-grid">
        {ateliers.map(a => (
          <div key={a._id} className="atelier-card" onClick={() => setSelected(a)}>
            <h3>{a.title}</h3>
            <p>{new Date(a.date).toLocaleDateString("fr-FR")} — {new Date(a.date).toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit"})}</p>
            <p><strong>{a.price} €</strong></p>
            <p>Places restantes : {a.placesLeft}</p>
          </div>
        ))}
      </div>

      {/* Détails d’un atelier */}
      {selected && (
        <div className="atelier-details">
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <p><strong>Prix : {selected.price} €</strong></p>
          <p>Date : {new Date(selected.date).toLocaleDateString("fr-FR")} à {new Date(selected.date).toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit"})}</p>
          <p>Places disponibles : {selected.placesLeft}/{selected.places}</p>

          <button onClick={() => handleReserve(selected._id)}>Réserver</button>
          <button onClick={() => setSelected(null)}>Fermer</button>

          {reserved && <p className="success">✅ Réservation confirmée !</p>}
        </div>
      )}
    </div>
  );
}
