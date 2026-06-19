import "./Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaPinterestP } from "react-icons/fa";

const PUB = process.env.PUBLIC_URL;

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-grid">

            {/* Brand */}
            <div className="footer-brand">
              <h2>Coffee Arts</h2>
              <span>Paris</span>
              <p>Un lieu unique où la céramique rencontre le café artisanal à Paris.</p>
              <p>Créer, déguster, partager.</p>
              <div className="social-icons">
                <a href="/" aria-label="Instagram"><FaInstagram /></a>
                <a href="/" aria-label="TikTok"><FaTiktok /></a>
                <a href="/" aria-label="Pinterest"><FaPinterestP /></a>
              </div>
            </div>

            {/* Découvrir */}
            <div>
              <h3>Découvrir</h3>
              <div className="footer-links">
                <ul>
                  <li><Link to="/cafe">Café</Link></li>
                  <li><Link to="/ateliers">Céramique</Link></li>
                  <li><Link to="/boutique">Boutique</Link></li>
                  <li><Link to="/evenements">Événements</Link></li>
                </ul>
                <ul>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/a-propos">À propos</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/espace-client">Espace client</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3>Contact</h3>
              <p>07.66.91.82.94</p>
              <p>coffeeartsparis@gmail.com</p>
              <p>25 Boulevard du Temple</p>
              <p>75003 Paris</p>
            </div>

            {/* Horaires */}
            <div>
              <h3>Horaires</h3>
              <p>Mardi – Mercredi – Jeudi – Vendredi</p>
              <p>08h – 20h</p>
              <p>Samedi – Dimanche</p>
              <p>10h – 21h</p>
            </div>

          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <p>© 2026 Coffee Arts Paris. Tous droits réservés.</p>

            <div className="payment-icons">
              <img src={`${PUB}/mastercard.png`}  alt="Mastercard" className="mastercard-icon" />
              <img src={`${PUB}/visa.png`}        alt="Visa"       className="visa-icon" />
              <img src={`${PUB}/gpay.webp`}       alt="GPay"       className="gpays-icon" />
              <img src={`${PUB}/applepay.png`}    alt="Apple Pay"  className="applepay-icon" />
            </div>

            <div className="legal-links">
              <a href="/">Politique de confidentialité</a>
              <a href="/">Politique cookies</a>
              <a href="/">Mentions légales</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating socials */}
      <div className="floating-socials">
        <a href="/" aria-label="Instagram"><FaInstagram /></a>
        <a href="/" aria-label="TikTok"><FaTiktok /></a>
        <a href="/" aria-label="Pinterest"><FaPinterestP /></a>
      </div>
    </>
  );
};

export default Footer;