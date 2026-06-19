import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Engagements.css";

const VALEURS = [
  {
    title: "Le café comme point de départ",
    desc: "Nous sommes avant tout un coffee shop, avec des boissons de qualité et une vraie exigence gustative. La création vient enrichir l'expérience, sans jamais la remplacer.",
  },
  {
    title: "La création comme prolongement",
    desc: "Chez Coffee Arts Paris, la création n'est pas une performance. On vient pour essayer, apprendre, toucher et prendre plaisir au geste, simplement.",
  },
  {
    title: "Un espace où l'on se sent bien",
    desc: "Coffee Arts Paris a été pensé comme un lieu calme et accueillant, où l'on peut s'attarder, se retrouver et faire une pause, seul ou à plusieurs.",
  },
];

const ENGAGEMENTS = [
  {
    key: "emballages",
    title: "Des emballages respectueux de la planète",
    short: "Tous nos emballages à emporter sont biodégradables, recyclables ou compostables. Nous privilégions des matériaux responsables...",
    full: "Tous nos emballages à emporter sont biodégradables, recyclables ou compostables. Nous privilégions des matériaux responsables et avons supprimé tout plastique à usage unique. Nos contenants sont sourcés auprès de fournisseurs engagés dans une démarche écoresponsable, pour que chaque café à emporter soit aussi un geste pour la planète.",
  },
  {
    key: "gaspillage",
    title: "Lutte contre le gaspillage alimentaire",
    short: "Parce que chaque produit mérite d'être respecté, nos invendus alimentaires sont redistribués à des associations locales...",
    full: "Parce que chaque produit mérite d'être respecté, nos invendus alimentaires sont redistribués à des associations locales en fin de journée. Nous travaillons également avec des fournisseurs locaux pour réduire les distances et optimiser nos commandes afin de limiter les pertes au maximum.",
  },
  {
    key: "marc",
    title: "Le marc de café, une seconde vie naturelle",
    short: "Chez Coffee Arts Paris, même notre marc de café continue son histoire...",
    full: "Chez Coffee Arts Paris, même notre marc de café continue son histoire. Récupéré et valorisé, il est utilisé comme fertilisant naturel, transmis à des jardiniers urbains ou intégré dans des projets créatifs. Rien n'est jeté : tout est pensé pour circuler.",
  },
  {
    key: "creer",
    title: "Créer autrement",
    short: "Coffee Arts Paris n'est pas seulement un coffee shop. C'est un lieu où l'on crée, partage et consomme autrement...",
    full: "Coffee Arts Paris n'est pas seulement un coffee shop. C'est un lieu où l'on crée, partage et consomme autrement. Nos ateliers favorisent la création manuelle, la lenteur et le rapport sensible aux matières. Une façon de renouer avec l'essentiel, loin de la surconsommation.",
  },
];

export default function Engagements() {
  const [expanded, setExpanded] = useState({});
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const toggle = (key) =>
    setExpanded(e => ({ ...e, [key]: !e[key] }));

  return (
    <div className="eng-page">

      {/* ════════════════════════
          SECTION 1 — Nos engagements (hero)
      ════════════════════════ */}
      <section className="eng-hero">
        <div className="eng-container">
          <h1 className="eng-hero-title">Nos engagements</h1>
          <p className="eng-hero-sub">Une approche responsable, appliquée au quotidien.</p>
        </div>
      </section>

      {/* ════════════════════════
          SECTION 2 — Nos valeurs (fond vert)
      ════════════════════════ */}
      <section className="eng-valeurs">
        <div className="eng-container">
          <h2 className="eng-valeurs-title">Nos valeurs</h2>
          <p className="eng-valeurs-sub">Une manière d'être, de créer et de recevoir.</p>

          <div className="eng-valeurs-grid">
            {VALEURS.map((v, i) => (
              <div className="eng-valeur-card" key={i}>
                <h3 className="eng-valeur-title">{v.title}</h3>
                <p className="eng-valeur-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════
          SECTION 3 — Engagements écologiques
      ════════════════════════ */}
      <section className="eng-eco">
        <div className="eng-container">
          <h2 className="eng-eco-title">Nos engagements écologiques</h2>
          <p className="eng-eco-sub">Une attention portée aux matières, aux ressources et aux gestes.</p>
          <p className="eng-eco-desc">
            Chez Coffee Arts Paris, nous avons imaginé un lieu où la création, le café et la conscience
            écologique avancent ensemble. Chaque détail de notre concept est pensé pour avoir un impact
            positif, aussi bien sur nos clients que sur notre environnement.
          </p>

          <div className="eng-eco-grid">
            {ENGAGEMENTS.map(e => (
              <div className="eng-eco-card" key={e.key}>
                <h3 className="eng-eco-card-title">{e.title}</h3>
                <p className="eng-eco-card-desc">
                  {expanded[e.key] ? e.full : e.short}
                </p>
                <button
                  className="eng-eco-link"
                  onClick={() => toggle(e.key)}
                >
                  {expanded[e.key] ? "Voir moins" : "Voir plus"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}