import { useState } from "react";
import axios from "axios";
import "./Contact.css";

const API = process.env.REACT_APP_API_URL;

const FAQ_TABS = ["Coffee Arts Paris", "Les ateliers", "La boutique en ligne"];

const FAQ_DATA = {
  "Coffee Arts Paris": [
    { q: "Qu'est-ce que Coffee Arts Paris ?", a: "Coffee Arts Paris est un espace hybride autour du café de spécialité, de la céramique et des ateliers créatifs, situé au cœur de Paris." },
    { q: "Peut-on venir uniquement pour boire un café ?", a: "Oui, absolument ! Notre café est ouvert à tous, sans réservation, du mardi au dimanche." },
    { q: "Faut-il réserver pour venir chez Coffee Arts Paris ?", a: "Pour le café, aucune réservation n'est nécessaire. Pour les ateliers, la réservation est obligatoire via notre site." },
    { q: "Le lieu est-il accessible à tous ?", a: "Oui, Coffee Arts Paris est ouvert à tous les niveaux, débutants comme confirmés." },
    { q: "Où trouver les informations pratiques (horaires, adresse) ?", a: "25 Boulevard du Temple, 75003 Paris. Mardi–Vendredi 08h–20h • Samedi–Dimanche 10h–21h." },
  ],
  "Les ateliers": [
    { q: "Comment réserver un atelier ?", a: "Via notre site dans la section Ateliers, ou directement par email." },
    { q: "Faut-il avoir de l'expérience ?", a: "Non, tous nos ateliers sont accessibles aux débutants. Chaque session est guidée par une céramiste professionnelle." },
    { q: "Quelle est la durée d'un atelier ?", a: "En général 2h de création, suivies de 15 minutes de nettoyage et rangement." },
    { q: "Les ateliers sont-ils remboursables ?", a: "Les annulations doivent être faites 48h à l'avance pour obtenir un remboursement." },
  ],
  "La boutique en ligne": [
    { q: "Quels sont les délais de livraison ?", a: "3 à 5 jours ouvrés en France métropolitaine." },
    { q: "Puis-je retourner un produit ?", a: "Oui, dans un délai de 14 jours après réception, en parfait état." },
    { q: "Les produits céramique sont-ils faits main ?", a: "Oui, toutes nos pièces céramiques sont créées et peintes à la main dans notre atelier." },
    { q: "Comment suivre ma commande ?", a: "Un email de confirmation avec numéro de suivi vous sera envoyé dès l'expédition." },
  ],
};

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "Renseignement général", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [faqTab, setFaqTab]   = useState("Coffee Arts Paris");
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      setForm({ name: "", email: "", subject: "Renseignement général", message: "" });
    } catch { alert("Erreur lors de l'envoi"); }
    finally { setLoading(false); }
  };

  return (
    <div className="ct-page">

      {/* ── HERO ── */}
      <div className="ct-hero">
        <h1 className="ct-hero-title">Contactez-<em>nous</em></h1>
        <p className="ct-hero-sub">
          Une question sur nos ateliers, notre café ou nos produits ?<br />
          Nous sommes là pour vous répondre.
        </p>
        <div className="ct-info-bar">
          <div className="ct-info-item">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>07.66.91.82.94</span>
          </div>
          <div className="ct-info-item">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>coffeeartsparis@gmail.com</span>
          </div>
          <div className="ct-info-item ct-info-hours">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div>
              <span>Mardi - Mercredi - Jeudi - Vendredi 08h - 20h</span><br />
              <span>Samedi - Dimanche 10h - 21h</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARTE ── */}
      <div className="ct-map-section">
        <h2 className="ct-map-title">Nous rendre visite</h2>
        <div className="ct-map-addr">
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>25 Boulevard du Temple, 75003 Paris</span>
        </div>
        <div className="ct-map-wrap">
          <iframe
            title="Coffee Arts Paris"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9!2d2.3639!3d48.8636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1b2a3b2d3f%3A0x1234567890abcdef!2s25%20Boulevard%20du%20Temple%2C%2075003%20Paris!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ── FORMULAIRE ── */}
      <div className="ct-form-section">
        {sent ? (
          <div className="ct-form-card ct-sent">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h2>Message envoyé !</h2>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
            <button className="ct-btn" onClick={() => setSent(false)}>Envoyer un autre message</button>
          </div>
        ) : (
          <div className="ct-form-card">
            <h2 className="ct-form-title">Formulaire de contact</h2>
            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-form-row">
                <div className="ct-fg">
                  <label>Nom</label>
                  <input
                    type="text" name="name" placeholder="Votre nom"
                    value={form.name} onChange={handleChange} required
                  />
                </div>
                <div className="ct-fg">
                  <label>Email</label>
                  <input
                    type="email" name="email" placeholder="votre@email.com"
                    value={form.email} onChange={handleChange} required
                  />
                </div>
              </div>
              <div className="ct-fg">
                <label>Objet</label>
                <div className="ct-select-wrap">
                  <select name="subject" value={form.subject} onChange={handleChange}>
                    <option>Renseignement général</option>
                    <option>Commande</option>
                    <option>Ateliers</option>
                    <option>Réclamation</option>
                    <option>Collaboration</option>
                    <option>Presse</option>
                  </select>
                  <svg viewBox="0 0 24 24" className="ct-sel-chev"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div className="ct-fg">
                <label>Message</label>
                <textarea
                  name="message" placeholder="Comment pouvons-nous vous aider ?"
                  rows={6} value={form.message} onChange={handleChange} required
                />
              </div>
              <button type="submit" className="ct-btn" disabled={loading}>
                {loading ? "Envoi..." : "Envoyer"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── COLLABORATIONS ── */}
      <div className="ct-collabs">
        <h2 className="ct-collabs-title">Collaborations</h2>
        <div className="ct-collabs-grid">
          {[
            {
              title: "Partenariats",
              cls: "ct-collab-green",
              text: "Coffee Arts Paris s'associe à des projets créatifs choisis avec attention, en lien avec l'artisanat, la matière et l'expérience du lieu. Si votre projet résonne avec l'univers du lieu, nous serons ravis d'en discuter."
            },
            {
              title: "Influenceurs",
              cls: "ct-collab-beige",
              text: "Coffee Arts Paris collabore ponctuellement avec des créateurs de contenu dont l'univers et la sensibilité font écho au lieu. Nous privilégions les approches sincères, les échanges authentiques et les contenus pensés avec soin."
            },
            {
              title: "Presse",
              cls: "ct-collab-light",
              text: "Pour toute demande presse, interview ou parution, Coffee Arts Paris reste à l'écoute des médias souhaitant découvrir le lieu, son univers et sa démarche. N'hésitez pas à nous contacter pour toute demande d'information."
            },
          ].map(c => (
            <div key={c.title} className={`ct-collab-card ${c.cls}`}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="ct-faq">
        <h2 className="ct-faq-title">FAQ</h2>
        <p className="ct-faq-sub">On vous répond ici.</p>

        {/* Tabs */}
        <div className="ct-faq-tabs">
          {FAQ_TABS.map(t => (
            <button
              key={t}
              className={`ct-faq-tab${faqTab === t ? " ct-faq-tab-active" : ""}`}
              onClick={() => { setFaqTab(t); setOpenFaq(null); }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="ct-faq-items">
          {FAQ_DATA[faqTab].map((item, i) => (
            <div
              key={i}
              className={`ct-faq-item${openFaq === i ? " ct-faq-open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="ct-faq-q">
                <span>{item.q}</span>
                <svg viewBox="0 0 24 24" className="ct-faq-chev">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              {openFaq === i && (
                <div className="ct-faq-a">{item.a}</div>
              )}
            </div>
          ))}
        </div>

        <p className="ct-faq-bottom-text">Vous ne trouvez pas la réponse à votre question ?</p>
        <button className="ct-btn ct-btn-dark">Contactez-nous</button>
      </div>

    </div>
  );
}