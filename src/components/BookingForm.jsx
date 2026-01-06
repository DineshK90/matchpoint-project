import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createBooking } from "../services/bookingsApi";
import { updateEvent } from "../services/eventsApi";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function BookingForm({ userId, onSuccess, event }) {
  const isEdit = Boolean(event);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    phone_number: "",
    email: "",
    image_url: "",
    is_public: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        date: event.date || "",
        time: event.time || "",
        phone_number: event.phone_number || "",
        email: event.email || "",
        image_url: event.image_url || "",
        is_public: event.is_public ?? true,
      });
    }
  }, [event]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleImageUpload() {
    if (!imageFile) return form.image_url;

    setUploading(true);

    const imageRef = ref(
      storage,
      `events/${userId}/${Date.now()}_${imageFile.name}`
    );

    await uploadBytes(imageRef, imageFile);
    const url = await getDownloadURL(imageRef);

    setUploading(false);
    return url;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const imageUrl = await handleImageUpload();

    const payload = {
      ...form,
      image_url: imageUrl,
    };

    if (isEdit) {
      await updateEvent(event.id, payload);
    } else {
      await createBooking({
        ...payload,
        user_id: userId,
      });
    }

    onSuccess();
  }

  return (
    <Form onSubmit={handleSubmit} className="glass-card p-4 mb-4">
      <h5 className="mb-3">{isEdit ? "Edit Event" : "Create Event"}</h5>

      <Form.Group className="mb-2">
        <Form.Control
          name="title"
          placeholder="Event title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex gap-2 mb-2">
        <Form.Control
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <Form.Control
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
      </div>

      <Form.Group className="mb-2">
        <Form.Control
          name="phone_number"
          placeholder="Phone number"
          value={form.phone_number}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          type="email"
          name="email"
          placeholder="Contact email"
          value={form.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        {form.image_url && (
          <img
            src={form.image_url}
            alt="Event"
            style={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          />
        )}
      </Form.Group>

      <Form.Check
        className="mb-3"
        type="checkbox"
        label="Public Event"
        name="is_public"
        checked={form.is_public}
        onChange={handleChange}
      />

      <Button type="submit" variant="info" disabled={uploading}>
        {uploading ? "Uploading..." : isEdit ? "Save Changes" : "Create Event"}
      </Button>
    </Form>
  );
}
