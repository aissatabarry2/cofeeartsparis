import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Specialty coffee & pottery studio
        </h1>

        <h3>
          Sip, create and connect
        </h3>

        <p>
          Un lieu hybride où l'on vient savourer un café,
          créer de ses mains et partager un moment,
          simplement.
        </p>

        <span>
          25 boulevard du Temple, 75003 Paris
        </span>

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
};

export default HeroSection;