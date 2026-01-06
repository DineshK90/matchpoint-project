import { Container, Row, Col } from "react-bootstrap";

const features = [
  { title: "Create Events", desc: "Host esports tournaments with full control.", icon: "🎮" },
  { title: "Smart Scheduling", desc: "Schedule events with reminders.", icon: "📅" },
  { title: "Secure Authentication", desc: "Firebase-powered user security.", icon: "🔐" },
  { title: "Media Uploads", desc: "Upload banners via Firebase Storage.", icon: "📸" },
  { title: "Admin Control", desc: "Manage all events platform-wide.", icon: "🛡️" },
  { title: "Calendar Sync", desc: "Sync events to Google Calendar.", icon: "⏱️" },
];

export default function Features() {
  return (
    <section className="section-dark">
      <Container className="py-5">
        <Row>
          {features.map((f, i) => (
            <Col md={4} key={i} className="mb-4">
              <div className="glass-card h-100">
                <div className="card-icon">{f.icon}</div>
                <h5>{f.title}</h5>
                <p className="text-secondary">{f.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
