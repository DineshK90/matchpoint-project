import { Container } from "react-bootstrap";
import heroBg from "../assets/hero-bg.jpg";

import eventsImg from "../assets/feature-events.jpg";
import schedulingImg from "../assets/feature-scheduling.jpg";
import adminImg from "../assets/feature-admin.jpg";

export default function Hero() {
  function scrollToContent() {
    const target = document.getElementById("how-it-works");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <Container className="hero-content text-light">
        <h1 className="hero-title">MatchPoint</h1>

        <div className="hero-status">
          <span className="status-dot" />
          LIVE PLATFORM • EVENTS ENABLED
        </div>

        <p className="hero-tagline">
          Create, manage, and schedule esports tournaments and gaming events —
          built for organizers and communities.
        </p>

        {/* FEATURE CARDS */}
        <div className="hero-feature-cards">
          <div className="hero-image-card">
            <img src={eventsImg} alt="Events" />
            <div className="hero-image-overlay">
              <h4>Events</h4>
            </div>
          </div>

          <div className="hero-image-card">
            <img src={schedulingImg} alt="Scheduling" />
            <div className="hero-image-overlay">
              <h4>Scheduling</h4>
            </div>
          </div>

          <div className="hero-image-card">
            <img src={adminImg} alt="Admin Control" />
            <div className="hero-image-overlay">
              <h4>Admin Control</h4>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="hero-cta-game" onClick={scrollToContent}>
          ENTER ARENA
        </button>

        <div className="scroll-indicator">SCROLL</div>
      </Container>
    </section>
  );
}
