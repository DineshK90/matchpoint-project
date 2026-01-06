import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function AppNavbar() {
  const { user, username } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg="dark"
      variant="dark"
      className="glass-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          MatchPoint
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto align-items-center gap-3">

            {/* PUBLIC */}
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>

            {/* USER */}
            {user && (
              <Nav.Link as={Link} to="/bookings" className="fw-semibold">
                {username ? `${username}'s Dashboard` : "Dashboard"}
              </Nav.Link>
            )}

            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}

            {user && (
              <Button size="sm" variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
