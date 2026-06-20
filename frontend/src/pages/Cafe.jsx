import { useState } from "react";
import "./Cafe.css";
import { useNavigate } from "react-router-dom";

const TABS = ["La carte", "Torréfaction", "Nos torréfacteurs"];
const PUB = process.env.PUBLIC_URL;






export default function Cafe() {
  const navigate = useNavigate();
  const [activeTab, setTab] = useState("La carte");

  return (
    <div className="cafe-page">
        
      {/* ── HERO ── */}
      <div className="cafe-hero">
        <h1 className="cafe-hero-title">La <em>carte</em></h1>
        <p className="cafe-hero-sub">
          Une sélection pensée autour du café, du fait-maison<br />
          et du plaisir de partager.
        </p>
      </div>

      {/* ── TABS ── */}
      <div className="cafe-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`cafe-tab${activeTab === t ? " cafe-tab-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ══════════════ LA CARTE ══════════════ */}
      {activeTab === "La carte" && (
  <>
    {/* Images du menu */}
    <div className="carte-images-section">
      <div className="carte-img-wrap">
        <img src={`${PUB}/menu-partie1.jpg`} alt="Menu Café & Matcha" className="carte-menu-img" />
      </div>
      <div className="carte-img-wrap">
        <img src={`${PUB}/menu-partie2.jpg`} alt="Menu Pastry & Snack" className="carte-menu-img" />
      </div>
    </div>

    {/* Nos cafés + CTA */}
    <div className="cafe-bottom">
      <div className="cafe-nos-cafes">
        <h2 className="cafe-nos-title">Nos cafés</h2>
        <p className="cafe-nos-sub">
          Une sélection de cafés de spécialité, travaillés avec attention, de l'origine à l'extraction.
        </p>
        <div className="cafe-nos-grid">
          {[
            {
              title: "Origine des cafés",
              desc: "Nous sélectionnons des cafés de spécialité auprès de torréfacteurs choisis avec attention, en privilégiant la qualité, la traçabilité et le respect du produit."
            },
            {
              title: "Préparation & extraction",
              desc: "Chaque café est préparé avec soin, en adaptant la méthode d'extraction afin de révéler au mieux ses arômes et son équilibre."
            },
            {
              title: "Nos torréfacteurs",
              desc: "Nous collaborons avec différents torréfacteurs pour proposer une sélection de cafés adaptée au lieu et aux saisons."
            },
          ].map(c => (
            <div key={c.title} className="cafe-nos-card">
              <h3 className="cafe-nos-card-title">{c.title}</h3>
              <p className="cafe-nos-card-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cafe-cta">
        <h2 className="cafe-cta-title">
          Une expérience à vivre<br />sur place
        </h2>
        <p className="cafe-cta-sub">
          Toutes les informations pour venir découvrir le café.
        </p>
        <button className="cafe-cta-btn" onClick={() => navigate("/contact")}>
          Nous rendre visite
        </button>
      </div>
    </div>
  </>
)}

      {/* ══════════════ TORRÉFACTION ══════════════ */}
      {activeTab === "Torréfaction" && (
  <div className="torr-page">

    {/* SECTION TEXTE */}
    <section className="torr-section">
      <h2>Origine des grains</h2>

      <p>
        Chez Coffee Arts Paris, nous accordons une attention particulière
        à l'origine de chaque café que nous servons.
      </p>

      <p>
        Pour notre café signature, nous avons choisi de travailler avec Belleville Brûlerie,
        référence du café de spécialité à Paris, reconnue pour la qualité de ses assemblages
        ainsi que la sélection des grains.
      </p>

      <p>
        Notre café signature, Body Builder, est un assemblage de deux origines complémentaires :
        <br /><strong>Brésil – 70 % pour la rondeur et l’équilibre</strong><br />
        <strong>Éthiopie – 30 % pour les arômes aromatiques</strong>.
      </p>

      <p>
        Ce choix d’origines permet d’obtenir un café équilibré, à la fois intense et enveloppant,
        pensé pour offrir une expérience généreuse en tasse.
      </p>
    </section>

    {/* IMAGE BANNIÈRE */}
    <div className="torr-banner">
      <img src={`${PUB}/new.png`} alt="Torréfaction" />
    </div>

    {/* Extraction */}
    <section className="torr-section">
      <h2>Torréfaction & extraction</h2>

      <p>
        Le Body Builder bénéficie d'une torréfaction plus poussée, qui développe un corps puissant et une belle profondeur de saveurs.
      </p>

      <p>
        En tasse, on retrouve des notes gourmandes de cacao, chocolat et amandes, relevées par une légère acidité, pour un café enveloppant et structuré.
      </p>
      <p>
        Nous adaptons nos méthodes d'extraction afin de respecter cette identité : révéler la matière, la rondeur et l'intensité, sans jamais masquer le caractère du café.
      </p>
    </section>

  </div>
)}

      {/* ══════════════ NOS TORRÉFACTEURS ══════════════ */}
      {activeTab === "Nos torréfacteurs" && (
  <div className="torr-page">

    {/* ── INTRO ── */}
    <section className="torr-section">
      <h2>Nos torréfacteurs</h2>
      <p>Des partenaires engagés pour un café de qualité.</p>
    </section>

    {/* ── TEXTE PRINCIPAL ── */}
    <div className="torr-text">
      <p>
        Chez Coffee Arts Paris, nous avons choisi de travailler avec des torréfacteurs engagés.
        Des partenaires qui placent la qualité, la transparence et le respect du produit au cœur de leur démarche.
      </p>
      <p>
        Parmi eux, l’entreprise Belleville occupe une place centrale. Torréfacteur reconnu du café de spécialité à Paris,
        Belleville sélectionne ses grains avec exigence et entretient des relations durables avec les producteurs.
      </p>
    </div>

    {/* ── CARTES ── */}
    <div className="torr-cards">
      <div className="torr-card">
        <h3>Une composition pensée avec précision</h3>
        <p>
          Chaque assemblage est conçu pour trouver l’équilibre entre intensité, rondeur et richesse aromatique.
          La torréfaction est ajustée pour révéler le caractère du café, tout en respectant son origine.
        </p>
      </div>

      <div className="torr-card">
        <h3>Un café fraîchement torréfié</h3>
        <p>
          Les cafés sont torréfiés en petites séries afin de garantir fraîcheur et régularité.
          Un soin particulier pour préserver les arômes et offrir une expérience constante.
        </p>
      </div>

      <div className="torr-card">
        <h3>Un engagement qui va plus loin</h3>
        <p>
          Au‑delà du goût, nous partageons avec nos torréfacteurs une même vision : soutenir une filière plus responsable.
          Régénération des forêts, pratiques agricoles durables et valorisation du travail des producteurs font partie intégrante de cette démarche.
        </p>
      </div>
    </div>

  </div>
)}

    </div>
  );
}