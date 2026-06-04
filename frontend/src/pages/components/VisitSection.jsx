import React from "react";
import "./VisitSection.css";

const VisitSection = () => {
  return (
    <section className="visit-section">
      <div className="visit-container">
        <h2 className="visit-title">
          Une expérience à vivre
          <br />
          sur place
        </h2>

        <p className="visit-text">
          Toutes les informations pour venir découvrir le café.
        </p>

        <button className="visit-btn">
          Nous rendre visite
        </button>
      </div>
    </section>
  );
};

export default VisitSection;