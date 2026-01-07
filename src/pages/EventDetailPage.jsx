import { useEffect, useState, useCallback } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getEventById,
  joinPublicEvent,
  requestPrivateEvent,
  getJoinRequests,
  approveJoin,
  getParticipants,
  deleteEvent,
  getJoinStatus,
} from "../services/eventsApi";
import BookingForm from "../components/BookingForm";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [joinStatus, setJoinStatus] = useState(null);
  const [requests, setRequests] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const isOwner = user && event?.user_id === user.uid;
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isAdmin;

  const loadEvent = useCallback(async () => {
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch {
      navigate("/events");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const loadJoinStatus = useCallback(async () => {
    if (!user || !event || isOwner) return;

    try {
      const status = await getJoinStatus(event.id, user.uid);
      setJoinStatus(status?.status || null);
    } catch {
      setJoinStatus(null);
    }
  }, [user, event, isOwner]);

  const loadRequests = useCallback(async () => {
    if (!user || !canManage || !event) return;

    try {
      const data = await getJoinRequests(event.id, user.uid);
      setRequests(data);
    } catch (err) {
      console.warn("Join requests unavailable", err.message);
      setRequests([]);
    }
  }, [user, canManage, event]);

  const loadParticipants = useCallback(async () => {
    if (!user || !canManage || !event) return;

    try {
      const data = await getParticipants(event.id, user.uid);
      setParticipants(data);
    } catch (err) {
      console.warn("Participants unavailable", err.message);
      setParticipants([]);
    }
  }, [user, canManage, event]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  useEffect(() => {
    if (!event || !user) return;

    loadJoinStatus();
    loadRequests();
    loadParticipants();
  }, [event, user, loadJoinStatus, loadRequests, loadParticipants]);

  if (loading) {
    return (
      <Container className="py-5 text-light">
        <p>Loading event...</p>
      </Container>
    );
  }

  if (!event) return null;

  return (
    <Container className="py-5 text-light">
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          style={{
            width: "100%",
            maxHeight: "320px",
            objectFit: "cover",
            borderRadius: "14px",
            marginBottom: "2rem",
          }}
        />
      )}

      {editing && (
        <BookingForm
          event={event}
          onSuccess={() => {
            setEditing(false);
            loadEvent();
          }}
        />
      )}

      <h2 className="mb-2">{event.title}</h2>

      <p className="text-secondary mb-1">
        📅 {event.date} • 🕒 {event.time}
      </p>

      <Badge bg={event.is_public ? "success" : "warning"} className="mb-3">
        {event.is_public ? "Public Event" : "Private Event"}
      </Badge>

      <p className="mt-3">{event.description}</p>

      <div className="mt-4 d-flex gap-2 flex-wrap">
        {canManage && (
          <>
            <Button
              variant="secondary"
              onClick={() => setEditing((v) => !v)}
            >
              {editing ? "Cancel Edit" : "Edit Event"}
            </Button>

            <Button
              variant="danger"
              onClick={async () => {
                if (confirm("Delete this event?")) {
                  await deleteEvent(event.id);
                  navigate("/events");
                }
              }}
            >
              Delete Event
            </Button>
          </>
        )}

        {user && !isOwner && event.is_public && joinStatus !== "joined" && (
          <Button onClick={() => joinPublicEvent(event.id, user.uid)}>
            Join Event
          </Button>
        )}

        {user && !isOwner && !event.is_public && !joinStatus && (
          <Button
            variant="warning"
            onClick={() => requestPrivateEvent(event.id, user.uid)}
          >
            Request to Join
          </Button>
        )}

        {!user && (
          <Button variant="outline-light" onClick={() => navigate("/login")}>
            Login to Join
          </Button>
        )}

        {user && !isOwner && joinStatus === "pending" && (
          <Badge bg="warning">Pending Approval</Badge>
        )}

        {user && !isOwner && joinStatus === "joined" && (
          <Badge bg="success">Joined</Badge>
        )}
      </div>

      {canManage && requests.length > 0 && (
        <div className="mt-5">
          <h5>Join Requests</h5>

          {requests.map((r) => (
            <div
              key={r.id}
              className="d-flex justify-content-between align-items-center mb-2"
            >
              <span>@{r.username}</span>

              <Button
                size="sm"
                onClick={async () => {
                  await approveJoin(event.id, r.id, user.uid);
                  loadRequests();
                  loadParticipants();
                }}
              >
                Approve
              </Button>
            </div>
          ))}
        </div>
      )}

      {canManage && participants.length > 0 && (
        <div className="mt-5">
          <h5>Participants</h5>

          {participants.map((p, idx) => (
            <div key={idx} className="text-secondary">
              @{p.username}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
