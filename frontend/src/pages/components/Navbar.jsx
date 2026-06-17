import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShoppingBag, Coffee } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link to="/cafe">Café</Link>
        <Link to="/ateliers">Ateliers</Link>
        <Link to="/boutique">Boutique</Link>
        <Link to="/evenements">Événements</Link>
      </div>

      <div className="nav-logo">
        <img src="/logo.png" alt="Coffee Arts" />
      </div>

      <div className="nav-right">
        <Link to="/blog">Blog</Link>
        <Link to="/engagements">Nos engagements</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Espace client</Link>

        <div className="nav-icons">
          <button>
            <ShoppingBag size={18} />
          </button>

          <button>
            <Coffee size={18} />
          </button>
        </div>
      </div>

    </nav>
  );
}