import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShoppingBag, Coffee } from "lucide-react";

const logo = process.env.PUBLIC_URL + "/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link to="/cafe">Café</Link>
        <Link to="/ateliers">Céramique</Link>
        <Link to="/boutique">Boutique</Link>
        <Link to="/evenements">Événements</Link>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Coffee Arts Paris" />
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/blog">Blog</Link>
        <Link to="/nos-engagements">Nos engagements</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Espace client</Link>

        <div className="nav-icons">
          <button aria-label="Panier">
            <ShoppingBag size={18} />
          </button>
          <button aria-label="Café">
            <Coffee size={18} />
          </button>
        </div>
      </div>

    </nav>
  );
}