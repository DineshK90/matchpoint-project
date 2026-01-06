import { useEffect, useState } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyEvents, getParticipants } from "../services/eventsApi";
import BookingForm from "../components/BookingForm";

export default function BookingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [participantsMap, setParticipantsMap] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getMyEvents(user);
      setEvents(data);

      const map = {};
      for (const event of data) {
        if (event.user_id === user.uid || user.role === "admin") {
          try {
            map[event.id] = await getParticipants(event.id, user.uid);
          } catch {
            map[event.id] = [];
          }
        }
      }
      setParticipantsMap(map);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, [user]);

  return (
    <Container className="py-5 text-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Events</h2>

        <Button variant="info" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Close" : "Create Event"}
        </Button>
      </div>

      {showForm && (
        <BookingForm
          userId={user.uid}
          onSuccess={() => {
            setShowForm(false);
            loadEvents();
          }}
        />
      )}

      {loading && <p>Loading events...</p>}

      {!loading && events.length === 0 && (
        <p className="text-secondary">
          You haven’t created or joined any events yet.
        </p>
      )}

      {!loading &&
        events.map((event) => {
          const isOwner = event.user_id === user.uid;
          const participants = participantsMap[event.id] || [];

          return (
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

              <h5 className="mb-1">{event.title}</h5>

              <p className="text-secondary mb-1">
                📅 {event.date} • 🕒 {event.time}
              </p>

              <div className="d-flex gap-2 mb-2">
                <Badge bg={event.is_public ? "success" : "warning"}>
                  {event.is_public ? "Public" : "Private"}
                </Badge>

                {isOwner && <Badge bg="info">Organiser</Badge>}
              </div>

              {participants.length > 0 && (
                <div className="mt-2">
                  <small className="text-secondary">Participants:</small>
                  <div className="text-secondary">
                    {participants.map((p) => `@${p.username}`).join(", ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </Container>
  );
}
