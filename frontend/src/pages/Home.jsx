import "./Home.css";

export default function Home() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h3>Sip, create and connect</h3>

        <h1>
          Un lieu hybride où l'on vient savourer un café,
          créer de ses mains et partager un moment,
          simplement.
        </h1>

        <p>25 boulevard du Temple, 75003 Paris</p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Réserver un atelier
          </button>

          <button className="btn-secondary">
            Découvrir la carte
          </button>
        </div>

      </div>

    </section>
  );
}