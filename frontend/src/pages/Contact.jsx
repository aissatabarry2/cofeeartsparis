import { useState } from "react";
import axios from "axios";
import "./Contact.css";

const API = process.env.REACT_APP_API_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/contact`, form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
  return (
  
      <div className="contact-intro">

  {/* TITRE */}
  <h1>Contactez-nous</h1>

  <p className="contact-subtitle">
    Une question sur nos ateliers, notre café ou nos produits ?<br />
    Nous sommes là pour vous répondre.
  </p>

  
      {/* Formulaire */}
     <div className="contact-form-card">
  <h2>Formulaire de contact</h2>

  <form onSubmit={handleSubmit} className="form-grid">

    {/* NOM */}
    <div className="form-group">
      <label>Nom</label>
      <input
        type="text"
        name="name"
        placeholder="Votre nom"
        value={form.name}
        onChange={handleChange}
        required
      />
    </div>

    {/* EMAIL */}
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="votre@email.com"
        value={form.email}
        onChange={handleChange}
        required
      />
    </div>

    {/* OBJET */}
    <div className="form-group full">
      <label>Objet</label>
      <select
        name="subject"
        value={form.subject}
        onChange={handleChange}
      >
        <option>Renseignement général</option>
        <option>Commande</option>
        <option>Ateliers</option>
        <option>Réclamation</option>
      </select>
    </div>

    {/* MESSAGE */}
    <div className="form-group full">
      <label>Message</label>
      <textarea
        name="message"
        placeholder="Comment pouvons-nous vous aider ?"
        rows="6"
        value={form.message}
        onChange={handleChange}
        required
      />
    </div>

    {/* BUTTON */}
    <div className="form-group full">
      <button type="submit">Envoyer</button>
    </div>

  </form>
</div>

      <div className="collaborations">

  <h2 className="collab-title">Collaborations</h2>

  <div className="collab-grid">

    {/* PARTENARIATS */}
    <div className="collab-card partenariats">
      <h3>Partenariats</h3>
      <p>
        Coffee Arts Paris s'associe à des projets créatifs choisis avec attention,
        en lien avec l'artisanat, la matière et l'expérience du lieu.
        Si votre projet résonne avec l'univers du lieu, nous serons ravis d'en discuter.
      </p>
    </div>

    {/* INFLUENCEURS */}
    <div className="collab-card influenceurs">
      <h3>Influenceurs</h3>
      <p>
        Coffee Arts Paris collabore ponctuellement avec des créateurs de contenu
        dont l'univers et la sensibilité font écho au lieu.
        Nous privilégions les approches sincères et les contenus pensés avec soin.
      </p>
    </div>

    {/* PRESSE */}
    <div className="collab-card presse">
      <h3>Presse</h3>
      <p>
        Pour toute demande presse, interview ou parution, Coffee Arts Paris reste à
        l'écoute des médias souhaitant découvrir le lieu et son univers.
      </p>
    </div>

  </div>
</div>

      {/* FAQ */}
      <section className="contact-faq">
        <h2>FAQ</h2>
        <div className="faq-item">
          <h3>Quels sont vos horaires ?</h3>
          <p>Mardi–Vendredi 08h–20h • Samedi–Dimanche 10h–21h</p>
        </div>
        <div className="faq-item">
          <h3>Où êtes-vous situés ?</h3>
          <p>25 Boulevard du Temple, 75003 Paris</p>
        </div>
        <div className="faq-item">
          <h3>Proposez-vous des ateliers privés ?</h3>
          <p>Oui, sur réservation via notre espace client ou par email.</p>
        </div>
        <div className="faq-item">
          <h3>Comment puis-je collaborer avec vous ?</h3>
          <p>Envoyez-nous un message via le formulaire de contact en sélectionnant “Collaboration”.</p>
        </div>
      </section>
    </div>
  );
}
