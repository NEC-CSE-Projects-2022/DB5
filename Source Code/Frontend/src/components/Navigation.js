import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation" data-testid="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" data-testid="nav-logo">
          <div className="logo-icon">
            <Sparkles size={24} />
          </div>
          <span className="logo-text">SummarySuite</span>
        </Link>
        
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            data-testid="nav-home"
          >
            Home
          </Link>
          <Link
            to="/summarize"
            className={`nav-link ${isActive("/summarize") ? "active" : ""}`}
            data-testid="nav-summarize"
          >
            Summarize
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            data-testid="nav-about"
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
            data-testid="nav-contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;