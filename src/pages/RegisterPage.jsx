import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/bookings");
    } catch (err) {
      alert(err.message);
    }
  }

    async function handleGoogleLogin() {
    await loginWithGoogle();
    navigate("/events");
  }

  return (
    <Container className="py-5 text-light">
      <h2 className="mb-4">Register</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="info">
          Create Account
        </Button>
      </Form>
            <div className="text-center mt-4">
        <Button
          variant="outline-light"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
      </div>
    </Container>
  );
}
