import "./CoffeeExperience.css";

const experiences = [
  {
    title: "Café de spécialité",
    subtitle: "Déguster",
    image: "/images/coffee-beans.jpg",
    link: "Découvrir la carte",
  },
  {
    title: "Ateliers créatifs",
    subtitle: "Créer",
    image: "/images/pottery.jpg",
    link: "Participer à un atelier",
  },
  {
    title: "La boutique",
    subtitle: "Emporter",
    image: "/images/mug.jpg",
    link: "Explorer la boutique",
  },
];

export default function CoffeeExperience() {
  return (
    <section className="experience-section">
      <div className="experience-container">

        <h2>Trois expériences, un même lieu</h2>

        <p className="experience-description">
          Un café de spécialité, des ateliers créatifs et une boutique,
          pensés pour se compléter.
        </p>

        <div className="experience-grid">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="experience-card"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="overlay" />

              <div className="experience-content">
                <span>{item.subtitle}</span>

                <h3>{item.title}</h3>

                <a href="/">
                  {item.link}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}