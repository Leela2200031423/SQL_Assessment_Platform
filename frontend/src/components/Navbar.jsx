import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span>CipherSQLStudio</span>
        </div>
        <div className="navbar-buttons">
          <button className="btn-signin" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
