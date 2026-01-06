import { Container, Row, Col } from "react-bootstrap";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-dark">
      <Container className="py-5">
        <h2 className="text-center mb-2">How MatchPoint Works</h2>
        <p className="text-center text-secondary mb-5">
          A simple workflow designed for competitive gaming communities
        </p>

        <Row className="text-center">
          <Col md={4} className="mb-4">
            <div className="glass-card h-100">
              <div className="card-icon">🔐</div>
              <h5>Secure Profile</h5>
              <p className="text-secondary">
                Secure authentication to store and access your personal
                dashboard and manage your events.
              </p>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <div className="glass-card h-100">
              <div className="card-icon">🎮</div>
              <h5>Create Your Event</h5>
              <p className="text-secondary">
                Set up events or tournaments with all the details you need.
              </p>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <div className="glass-card h-100">
              <div className="card-icon">📊</div>
              <h5>Manage & Track</h5>
              <p className="text-secondary">
                Update bookings, receive reminders, and sync events directly to
                your Google Calendar.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
