const BASE_URL = import.meta.env.VITE_API_URL;


export async function getAllEvents() {
  const res = await fetch(`${BASE_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export async function getEventById(eventId) {
  const res = await fetch(`${BASE_URL}/events/${eventId}`);

  if (!res.ok) {
    throw new Error("Failed to load event");
  }

  return res.json();
}

export async function getMyEvents(user) {
  const res = await fetch(
    `${BASE_URL}/events/user/${user.uid}?email=${encodeURIComponent(
      user.email
    )}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch my events");
  }

  return res.json();
}

export async function joinPublicEvent(eventId, userId) {
  const res = await fetch(`${BASE_URL}/events/${eventId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to join event");
  }

  return true;
}

export async function requestPrivateEvent(eventId, userId) {
  const res = await fetch(`${BASE_URL}/events/${eventId}/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to request join");
  }

  return true;
}


export async function getJoinRequests(eventId, userId) {
  const res = await fetch(
    `${BASE_URL}/events/${eventId}/requests?user_id=${userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to load join requests");
  }

  return res.json();
}

export async function approveJoin(eventId, participantId, userId) {
  const res = await fetch(
    `${BASE_URL}/events/${eventId}/approve/${participantId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    }
  );

  if (!res.ok) {
    throw new Error("Approval failed");
  }

  return res.json();
}


export async function getJoinStatus(eventId, userId) {
  const res = await fetch(
    `${BASE_URL}/events/${eventId}/participant/${userId}`
  );

  if (!res.ok) return null;
  return res.json();
}

export async function getParticipants(eventId, userId) {
  const res = await fetch(
    `${BASE_URL}/events/${eventId}/participants?user_id=${userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to load participants");
  }

  return res.json();
}


export async function deleteEvent(eventId) {
  const res = await fetch(`${BASE_URL}/bookings/${eventId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to delete event");
  }

  return true;
}

export async function updateEvent(eventId, data) {
  const res = await fetch(`${BASE_URL}/bookings/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to update event");
  }

  return res.json();
}

