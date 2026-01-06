import { useEffect, useState } from "react";
import { Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../services/eventsApi";
import { useAuth } from "../context/AuthContext";

export default function PublicEventsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return (
    <Container className="py-5 text-light">
      <h2 className="mb-4">Events</h2>

      {loading && <p>Loading events...</p>}

      {!loading && events.length === 0 && (
        <p className="text-secondary">No events available.</p>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          className="glass-card mb-4"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/events/${event.id}`)}
        >
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />
          )}

          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">{event.title}</h5>
              <p className="text-secondary mb-1">
                📅 {event.date} • 🕒 {event.time}
              </p>

              <Badge bg={event.is_public ? "success" : "warning"}>
                {event.is_public ? "Public" : "Private"}
              </Badge>
            </div>

            {!user && (
              <Badge bg="secondary" className="align-self-start">
                Login to join
              </Badge>
            )}
          </div>
        </div>
      ))}
    </Container>
  );
}
