const BASE_URL = import.meta.env.VITE_API_URL;


export async function getUserBookings(userId) {
  const res = await fetch(`${BASE_URL}/bookings/user/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user bookings");
  }

  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create booking");
  }

  return res.json();
}

export async function updateBooking(id, data) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update booking");
  }

  return res.json();
}

export async function deleteBooking(id, userId) {
  const res = await fetch(
    `${BASE_URL}/bookings/${id}?user_id=${userId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete booking");
  }

  return res.json();
}
