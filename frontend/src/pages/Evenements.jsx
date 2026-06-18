import { useNavigate } from "react-router-dom";
import "./Evenements.css";

const EVENTS = [
  {
    key: "inauguration",
    title: "Inauguration",
    desc: "Nous accueillons des inaugurations au sein du café, selon les disponibilités du lieu et le format souhaité.",
  },
  {
    key: "privatisation",
    title: "Privatisation",
    desc: "Nous proposons des privatisations du café, selon les disponibilités du lieu et le format envisagé.",
  },
  {
    key: "teambuilding",
    title: "Team building",
    desc: "Le café peut accueillir des formats de team building autour du café et de la création, selon les disponibilités du lieu.",
  },
  {
    key: "exposition",
    title: "Expositions – marché créateurs",
    desc: "Nous accueillons ponctuellement des expositions ou des temps dédiés aux créateurs, en lien avec l'univers du lieu.",
  },
];

export default function Evenements() {
  const navigate = useNavigate();

  return (
    <div className="ev-page">

      {/* ── SECTION 1 : Moments partagés ── */}
      <section className="ev-moments">
        <div className="ev-container">
          <h1 className="ev-moments-title">Moments partagés</h1>
          <p className="ev-moments-sub">
            Le café s'ouvre ponctuellement à des événements, pensés pour<br />
            s'intégrer <em>naturellement</em> au lieu.
          </p>
          <div className="ev-grid">
            {EVENTS.map(e => (
              <div className="ev-card" key={e.key}>
                <h2 className="ev-card-title">{e.title}</h2>
                <p className="ev-card-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : Image pleine largeur ── */}
      <section className="ev-banner">
        <img
          src="/EVENEMENTS - PHOTO 1.jpg"
          alt="Céramique Coffee Arts Paris"
          className="ev-banner-img"
        />
      </section>

      {/* ── SECTION 3 : Informations & demandes ── */}
      <section className="ev-contact-section">
        <div className="ev-container">
          <div className="ev-contact-card">
            <h2 className="ev-contact-title">Informations & demandes</h2>
            <p className="ev-contact-sub">
              Nous sommes disponibles pour discuter de votre événement et des disponibilités du lieu.
            </p>
            <button className="ev-contact-btn" onClick={() => navigate("/contact")}>
              Nous contacter
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}