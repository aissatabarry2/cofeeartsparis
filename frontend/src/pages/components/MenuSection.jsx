import "./MenuSection.css";

export default function MenuSection() {
  return (
    <section className="menu-section">

      <div className="menu-header">
        <h2>La carte</h2>

        <p>
          Une sélection pensée autour du café, du fait-maison
          <br />
          et du plaisir de partager.
        </p>

        <div className="menu-tabs">
          <button className="active">La carte</button>
          <button>Torréfaction</button>
          <button>Nos torréfacteurs</button>
        </div>
      </div>

      <div className="menu-content">

        <div className="menu-card">
          <img
            src="/images/menu-cafe.jpg"
            alt="Carte Café"
          />
        </div>

        <div className="menu-card">
          <img
            src="/images/menu-pastry.jpg"
            alt="Carte Pâtisserie"
          />
        </div>

      </div>

    </section>
  );
}