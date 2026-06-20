import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const API = process.env.REACT_APP_API_URL;
const PUB = process.env.PUBLIC_URL;

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(r => setProducts((r.data || []).slice(0, 3)))
      .catch(() => setProducts([]));
  }, []);

  const getImg = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${API?.replace("/api", "")}/uploads/${img}`;
  };

  return (
    <div className="hm-page">

      {/* 1. TROIS EXPÉRIENCES */}
      <section className="hm-exp">
        <div className="hm-container">
          <div className="hm-section-header">
            <h2>Trois expériences, un même lieu</h2>
            <p>Un café de spécialité, des ateliers créatifs et une boutique, pensés pour se compléter.</p>
          </div>
          <div className="hm-exp-grid">
            <div className="hm-exp-card" onClick={() => navigate("/cafe")}>
              <img src={`${PUB}/g1.jpg`} alt="Café de spécialité"
                onError={e => { e.target.parentElement.style.background = "#c8c4bc"; e.target.style.display = "none"; }}
              />
              <div className="hm-exp-overlay">
                <span className="hm-exp-eyebrow">DÉGUSTER</span>
                <h3>Café de spécialité</h3>
                <span className="hm-exp-link">Découvrir la carte</span>
              </div>
            </div>
            <div className="hm-exp-card" onClick={() => navigate("/ateliers")}>
              <img src={`${PUB}/atelier-studio.jpg`} alt="Ateliers créatifs"
                onError={e => { e.target.parentElement.style.background = "#c8c4bc"; e.target.style.display = "none"; }}
              />
              <div className="hm-exp-overlay">
                <span className="hm-exp-eyebrow">CRÉER</span>
                <h3>Ateliers créatifs</h3>
                <span className="hm-exp-link">Participer à un atelier</span>
              </div>
            </div>
            <div className="hm-exp-card" onClick={() => navigate("/boutique")}>
              <img src={`${PUB}/g3.png`} alt="La boutique"
                onError={e => { e.target.parentElement.style.background = "#c8c4bc"; e.target.style.display = "none"; }}
              />
              <div className="hm-exp-overlay">
                <span className="hm-exp-eyebrow">EMPORTER</span>
                <h3>La boutique</h3>
                <span className="hm-exp-link">Explorer la boutique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AU CŒUR DE COFFEE ARTS PARIS */}
      <section className="hm-gallery-section">
        <div className="hm-container">
          <div className="hm-section-header">
            <h2>Au cœur de Coffee Arts Paris</h2>
            <p>
              Des images pour découvrir l'ambiance du lieu, ses matières, et les instants<br />
              qui s'y vivent au quotidien.
            </p>
          </div>
          <div className="hm-gallery-grid">
            {[
              `${PUB}/g1.jpg`,
              `${PUB}/atelier-studio.jpg`,
              `${PUB}/g3.png`,
              `${PUB}/g4.jpg`,
              `${PUB}/atelier1.jpg`,
              `${PUB}/atelier2.jpg`,
              `${PUB}/atelier3.jpg`,
              `${PUB}/new1.png`,
            ].map((src, i) => (
              <div key={i} className="hm-gallery-item">
                <img
                  src={src}
                  alt={`Coffee Arts Paris ${i + 1}`}
                  onError={e => {
                    e.target.parentElement.style.background = "#e8e4dc";
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NOS DERNIÈRES NOUVEAUTÉS */}
      <section className="hm-products">
        <div className="hm-container">
          <div className="hm-section-header">
            <h2>Nos dernières nouveautés</h2>
            <p>L'univers Coffee Arts Paris, à emporter avec vous.</p>
          </div>
          {products.length === 0 ? (
            <div className="hm-products-empty">Découvrez bientôt nos nouveautés.</div>
          ) : (
            <div className="hm-products-grid">
              {products.map(p => (
                <div key={p._id} className="hm-product-card" onClick={() => navigate("/boutique")}>
                  <div className="hm-product-img-wrap">
                    {getImg(p.image)
                      ? <img src={getImg(p.image)} alt={p.name} />
                      : <div className="hm-product-img-ph">🛍️</div>
                    }
                  </div>
                  <div className="hm-product-body">
                    <div className="hm-product-top">
                      <h3>{p.name}</h3>
                      <span className="hm-product-price">{p.price} €</span>
                    </div>
                    <p className="hm-product-desc">
                      {p.description?.slice(0, 90)}
                      {p.description?.length > 90 ? "..." : ""}
                    </p>
                    <div className="hm-product-sep" />
                    <span className="hm-product-link">Voir plus</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. INSTAGRAM */}
      {/* 4. INSTAGRAM */}
<section className="hm-instagram">
  <div className="hm-insta-wrap">

    <div className="hm-insta-profile">
      <div className="hm-insta-avatar-wrap">
        <img
          src="/logo-instagram.png"
          alt="Coffee Arts Paris"
          className="hm-insta-avatar-img"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      <div className="hm-insta-account">
        <span className="hm-insta-handle">coffeearts.paris</span>
        <strong className="hm-insta-name">COFFEE ARTS PARIS</strong>
        <span className="hm-insta-followers">7 622 followers</span>
        <span className="hm-insta-pubs">·</span>
        <span className="hm-insta-pubs">63 publications</span>
      </div>

      <a
        href="https://instagram.com/coffeearts.paris"
        target="_blank"
        rel="noreferrer"
        className="hm-insta-icon-link"
      >
        <svg viewBox="0 0 24 24" className="hm-insta-svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </a>
    </div>

    <div className="hm-insta-grid">
      {[
        "/insta1.jpg",
        "/insta2.png",
        "/insta3.jpg",
        "/insta4.jpg",
        "/insta5.jpg",
        "/insta6.jpg",
      ].map((src, i) => (
        <a
          key={i}
          href="https://instagram.com/coffeearts.paris"
          target="_blank"
          rel="noreferrer"
          className="hm-insta-tile"
        >
          <img
            src={src}
            alt={`Instagram ${i + 1}`}
            className="hm-insta-tile-img"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.background = "#c8c4bc";
            }}
          />

          <div className="hm-insta-tile-overlay">
            <svg viewBox="0 0 24 24" className="hm-insta-tile-ico">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="white"
                stroke="none"
              />
            </svg>
          </div>
        </a>
      ))}
    </div>

  </div>
</section>

      {/* 5. CTA */}
      <section className="hm-cta">
        <h2 className="hm-cta-title">
          Un moment autour du café<br />et de la création
        </h2>
        <p className="hm-cta-sub">
          Un lieu où l'on vient créer, discuter, boire un café et s'attarder.<br />
          Des moments simples, à vivre et à partager.
        </p>
        <div className="hm-cta-buttons">
          <button className="hm-cta-btn-green" onClick={() => navigate("/ateliers")}>
            Découvrir les ateliers
          </button>
          <button className="hm-cta-btn-beige" onClick={() => navigate("/boutique")}>
            Accéder à la boutique
          </button>
        </div>
      </section>

    </div>
  );
}