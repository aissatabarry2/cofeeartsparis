import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShoppingBag, Coffee } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-left">
        <a href="/">Café</a>
        <Link to="/ateliers">Ateliers</Link>
        <Link to="/boutique">Boutique</Link>
        <a href="/">Événements</a>
      </div>

      <div className="nav-logo">
        <img
          src="/public/logo.png"
          alt="Coffee Arts"
        />
      </div>

      <div className="nav-right">
        <Link to="/blog">Blog</Link>
        <a href="/">Nos engagements</a>
         
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