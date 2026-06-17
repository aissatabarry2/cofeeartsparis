import { useState } from "react";
import "./Cafe.css";

const TABS = ["La carte", "Torréfaction", "Nos torréfacteurs"];

const CARTE_DATA = [
  {
    section: "CAFÉ",
    color: "#5c6b3a",
    items: [
      { name: "DECA",             price: "3,00€" },
      { name: "EXPRESSO / DOUBLE",price: "2,50 / 3,00€" },
      { name: "AMERICANO",        price: "4,00€" },
      { name: "FLAT WHITE",       price: "5,50€" },
      { name: "CORTADO",          price: "3,50€" },
      { name: "CAPPUCINO",        price: "5,50€" },
      { name: "LATTE",            price: "6,00€" },
      { name: "MOCCA",            price: "6,50€" },
    ],
    signatures: [
      { name: "PISTACHIO LATTE",    note: "Servi froid",    price: "7,50€" },
      { name: "CHERRY ICED LATTE",  note: "Servi froid",    price: "6,50€" },
      { name: "CINNAMON LATTE",     note: "Servi chaud",    price: "7,50€" },
      { name: "SPARKLING LATTE",    note: "Servi froid",    price: "6,50€" },
      { name: "UBE LATTE",          note: "Servi chaud",    price: "6,50€" },
      { name: "BANANA BREAD LATTE", note: "Servi chaud",    price: "8,00€" },
      { name: "ICED TIRAMISU COFFEE",note: "Servi froid",   price: "9,50€" },
    ],
    laitVegetal: "Lait d'avoine · coco/amande + 0,50€",
  },
  {
    section: "MATCHA",
    color: "#7a9a3a",
    items: [
      { name: "MATCHA LATTE",       price: "6,50€" },
      { name: "ICED MATCHA LATTE",  price: "7,00€" },
      { name: "MATCHA SIGNATURE",   price: "7,50€" },
    ],
  },
  {
    section: "BRUNCH",
    color: "#8b7355",
    items: [
      { name: "SHAKSHUKA DU CHEF",     price: "15,50€", desc: "Servis avec œuf poché pain de campagne, féta et coriandre. Allergène : œuf, lait et gluten" },
      { name: "BUNS CHAMPIGNON ÉPINARD",price: "14,00€", desc: "champignons poêlés et épinards frais, servi sur un houmous de betterave. Allergène : Gluten, sésame" },
    ],
    supplements: [
      { name: "OEUF POCHÉ",  price: "+ 2,50€" },
      { name: "HALLOUMI",    price: "+ 3,50€" },
      { name: "SAUMON",      price: "+ 4,50€" },
    ],
  },
];

const TORREFACTION = [
  {
    title: "Notre philosophie",
    content: "Nous sélectionnons nos cafés avec soin auprès de torréfacteurs engagés, qui travaillent en direct avec les producteurs. Chaque grain raconte une histoire, un terroir, une saison."
  },
  {
    title: "Traçabilité",
    content: "Tous nos cafés sont tracés de la ferme à la tasse. Nous privilégions les coopératives à impact social positif et les méthodes de traitement respectueuses de l'environnement."
  },
  {
    title: "Notre sélection",
    content: "Éthiopie Yirgacheffe · Colombie Huila · Brésil Cerrado · Guatemala Antigua. Chaque café est torréfié light à medium pour révéler toute sa complexité aromatique."
  },
];

const TORREFACTEURS = [
  { name: "Café Lomi", city: "Paris, France",    desc: "Torréfacteur artisanal parisien, pionnier du café de spécialité en France.", site: "cafelomi.com" },
  { name: "Hard Beans", city: "Opole, Pologne",  desc: "Lauréats de multiples récompenses, spécialisés dans les micro-lots d'exception.", site: "hardbeans.pl" },
  { name: "The Barn",   city: "Berlin, Allemagne",desc: "L'une des références européennes du café de spécialité, torréfaction légère.", site: "thebarn.de" },
  { name: "Mana Coffee", city: "Budapest, Hongrie",desc: "Approche minimaliste et rigoureuse, cafés naturels et lavés.", site: "manacoffee.hu" },
];

export default function Cafe() {
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
        <div className="carte-grid">

          {/* Card CAFÉ */}
          <div className="carte-card">
            <div className="carte-card-inner">
              <h2 className="carte-section-title" style={{ color: CARTE_DATA[0].color }}>
                CAFÉ
              </h2>
              <div className="carte-underline" style={{ background: CARTE_DATA[0].color }} />

              {/* Items */}
              <div className="carte-items">
                {CARTE_DATA[0].items.map(i => (
                  <div key={i.name} className="carte-item">
                    <span className="carte-item-name">{i.name}</span>
                    <span className="carte-item-price">{i.price}</span>
                  </div>
                ))}
              </div>

              {/* Lait végétal */}
              <div className="carte-lait">
                <strong>LAIT VÉGÉTAUX :</strong><br />
                {CARTE_DATA[0].laitVegetal}
              </div>

              {/* Boissons signature */}
              <div className="carte-signature-title">BOISSON SIGNATURE</div>
              <div className="carte-signatures">
                {CARTE_DATA[0].signatures.map(s => (
                  <div key={s.name} className="carte-signature-item">
                    <div className="carte-sig-circle">
                      <span className="carte-sig-price">{s.price}</span>
                    </div>
                    <div className="carte-sig-info">
                      <span className="carte-sig-name">{s.name}</span>
                      <span className="carte-sig-note">{s.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card BRUNCH */}
          <div className="carte-card carte-card-brunch">
            <div className="carte-card-inner">
              <h2 className="carte-section-title" style={{ color: CARTE_DATA[2].color }}>
                BRUNCH
              </h2>
              <div className="carte-underline" style={{ background: CARTE_DATA[2].color }} />

              <div className="brunch-items">
                {CARTE_DATA[2].items.map(item => (
                  <div key={item.name} className="brunch-item">
                    <div className="brunch-item-img-placeholder">🍳</div>
                    <div className="brunch-item-info">
                      <h4 className="brunch-item-name">{item.name}</h4>
                      <p className="brunch-item-desc">{item.desc}</p>
                      <span className="brunch-item-price">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suppléments */}
              <div className="brunch-suppl">
                <div className="brunch-suppl-title">Supplément</div>
                {CARTE_DATA[2].supplements.map(s => (
                  <div key={s.name} className="brunch-suppl-item">
                    <span className="brunch-suppl-name">{s.name}</span>
                    <span className="brunch-suppl-price">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card MATCHA */}
          <div className="carte-card carte-card-full">
            <div className="carte-card-inner">
              <h2 className="carte-section-title" style={{ color: CARTE_DATA[1].color }}>
                MATCHA
              </h2>
              <div className="carte-underline" style={{ background: CARTE_DATA[1].color }} />
              <p className="carte-note">(servi froid ou chaud)</p>
              <div className="carte-items">
                {CARTE_DATA[1].items.map(i => (
                  <div key={i.name} className="carte-item">
                    <span className="carte-item-name">{i.name}</span>
                    <span className="carte-item-price">{i.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════ TORRÉFACTION ══════════════ */}
      {activeTab === "Torréfaction" && (
        <div className="torr-page">
          <div className="torr-hero">
            <h2>Notre approche de la torréfaction</h2>
            <p>Du producteur à votre tasse, une chaîne du café transparente et engagée.</p>
          </div>
          <div className="torr-grid">
            {TORREFACTION.map(t => (
              <div key={t.title} className="torr-card">
                <div className="torr-card-icon">☕</div>
                <h3>{t.title}</h3>
                <p>{t.content}</p>
              </div>
            ))}
          </div>
          <div className="torr-origins">
            <h3>Nos origines du moment</h3>
            <div className="torr-origin-tags">
              {["Éthiopie Yirgacheffe", "Colombie Huila", "Brésil Cerrado", "Guatemala Antigua"].map(o => (
                <span key={o} className="torr-tag">{o}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ NOS TORRÉFACTEURS ══════════════ */}
      {activeTab === "Nos torréfacteurs" && (
        <div className="torr-page">
          <div className="torr-hero">
            <h2>Nos partenaires torréfacteurs</h2>
            <p>Des artisans passionnés avec qui nous partageons les mêmes valeurs.</p>
          </div>
          <div className="torrefacteurs-grid">
            {TORREFACTEURS.map(t => (
              <div key={t.name} className="torrefacteur-card">
                <div className="torrefacteur-logo">☕</div>
                <h3 className="torrefacteur-name">{t.name}</h3>
                <span className="torrefacteur-city">📍 {t.city}</span>
                <p className="torrefacteur-desc">{t.desc}</p>
                <a href={`https://${t.site}`} target="_blank" rel="noreferrer" className="torrefacteur-link">
                  {t.site} →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    {/* ══ NOS CAFÉS + CTA ══ */}
      <div className="cafe-bottom">

        {/* Nos cafés card */}
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

        {/* CTA visite */}
        <div className="cafe-cta">
          <h2 className="cafe-cta-title">
            Une expérience à vivre<br />sur place
          </h2>
          <p className="cafe-cta-sub">
            Toutes les informations pour venir découvrir le café.
          </p>
          <button className="cafe-cta-btn">Nous rendre visite</button>
        </div>

      </div>
    </div>
  );
}