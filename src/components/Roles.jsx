import { Container, Row, Col, Button } from "react-bootstrap";

export default function Roles() {
  return (
    <section id="roles" className="section-dark">
      <Container className="py-5">
        <h2 className="text-center mb-2">User Roles</h2>
        <p className="text-center text-secondary mb-5">
          Designed for both event organizers and platform administrators
        </p>

        <Row className="justify-content-center">
          
          <Col md={5} className="mb-4">
            <div className="glass-card role-user h-100">
              <div className="card-icon">🎮 </div>
              <h5>Players</h5>
              <ul className="role-list">
                <li>Join events freely</li>
                <li>Create and manage own events</li>
                <li>Receive email reminders</li>
                <li>Sync events to calendar</li>
              </ul>
                 <button className="role-btn role-btn-user">
      Join Now!
    </button>
            </div>
          </Col>

          
          <Col md={5} className="mb-4">
            <div className="glass-card role-admin h-100">
              <div className="card-icon">🛡️</div>
              <h5>Organiser</h5>
              <ul className="role-list">
                <li>View all bookings</li>
                <li>Edit or delete any event</li>
                <li>Moderate platform activity</li>
                <li>Upload event banners</li>
              </ul>
                <button className="role-btn role-btn-admin">
      Dashboard
    </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
