import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Master SQL Through Practice</h1>
        <p>Interactive SQL assignments designed to build your database skills from beginner to advanced.</p>
        <button className="btn-get-started" onClick={() => navigate("/signup")}>
          Get Started →
        </button>
      </div>
    </section>
  );
}
