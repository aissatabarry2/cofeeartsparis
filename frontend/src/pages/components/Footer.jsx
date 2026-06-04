import "./Footer.css";
import {
  FaInstagram,
  FaTiktok,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-grid">

            <div className="footer-brand">
              <h2>Coffee Arts</h2>
              <span>Paris</span>

              <p>
                Un lieu unique où la céramique
                rencontre le café artisanal à Paris.
              </p>

              <p>Créer, déguster, partager.</p>

              <div className="social-icons">
                <a href="/">
                  <FaInstagram />
                </a>

                <a href="/">
                  <FaTiktok />
                </a>

                <a href="/">
                  <FaPinterestP />
                </a>
              </div>
            </div>

            <div>
              <h3>Découvrir</h3>

              <div className="footer-links">
                <ul>
                  <li>Café</li>
                  <li>Céramique</li>
                  <li>Boutique</li>
                  <li>Événements</li>
                </ul>

                <ul>
                  <li>Blog</li>
                  <li>À propos</li>
                  <li>Contact</li>
                  <li>Espace client</li>
                </ul>
              </div>
            </div>

            <div>
              <h3>Contact</h3>

              <p>07.66.91.82.94</p>
              <p>coffeeartsparis@gmail.com</p>
              <p>25 Boulevard du Temple</p>
              <p>75003 Paris</p>
            </div>

            <div>
              <h3>Horaires</h3>

              <p>Mardi - Mercredi - Jeudi - Vendredi</p>
              <p>08h - 20h</p>

              <p>Samedi - Dimanche</p>
              <p>10h - 21h</p>
            </div>

          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">

            <p>
              © 2026 Coffee Arts Paris.
              Tous droits réservés.
            </p>

            <div className="payment-icons">
              <span>Mastercard</span>
              <span>Visa</span>
              <span>GPay</span>
              <span>Apple Pay</span>
            </div>

            <div className="legal-links">
              <a href="/">Politique de confidentialité</a>
              <a href="/">Politique cookies</a>
              <a href="/">Mentions légales</a>
            </div>

          </div>
        </div>
      </footer>

      <div className="floating-socials">
        <a href="/">
          <FaInstagram />
        </a>

        <a href="/">
          <FaTiktok />
        </a>

        <a href="/">
          <FaPinterestP />
        </a>
      </div>
    </>
  );
};

export default Footer;