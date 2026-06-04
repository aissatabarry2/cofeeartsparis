import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <div className="contact-wrapper">

      {/* HEADER */}
      <div className="contact-header">
        <h1>Contactez-nous</h1>
        <p>
          Une question sur nos ateliers, notre café ou nos produits ?<br />
          Nous sommes là pour vous répondre.
        </p>
      </div>

      {/* INFOS */}
      <div className="contact-info">
        <div>📞 07.66.91.82.94</div>
        <div>✉️ coffeeartsparis@gmail.com</div>
        <div>🕒 Mar–Dim : 08h - 20h</div>
      </div>

      {/* FORMULAIRE */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Votre message..."
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Envoyer</button>

        {success && (
          <p className="success">Message envoyé avec succès ✅</p>
        )}
      </form>

      {/* MAP */}
      <div className="contact-map">
        <h2>Nous rendre visite</h2>
        <p>25 Boulevard du Temple, 75003 Paris</p>

        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999!2d2.360122!3d48.866667"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* FAQ */}
      <div className="contact-faq">
        <h2>FAQ</h2>

        <details className="faq-item">
          <summary>Qu'est-ce que Coffee Arts Paris ?</summary>
          <p>Un café créatif proposant ateliers et expériences artistiques.</p>
        </details>

        <details className="faq-item">
          <summary>Peut-on venir uniquement pour boire un café ?</summary>
          <p>Oui, sans réservation nécessaire.</p>
        </details>

        <details className="faq-item">
          <summary>Faut-il réserver ?</summary>
          <p>Recommandé pour les ateliers, pas obligatoire pour le café.</p>
        </details>

        <details className="faq-item">
          <summary>Le lieu est-il accessible ?</summary>
          <p>Oui, accessible PMR.</p>
        </details>
      </div>
    </div>
  );
}