// src/components/Header.js
import Link from 'next/link'
import { Navbar, Nav, Container } from 'react-bootstrap'

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand: Logo + İsim */}
        <Navbar.Brand
          as={Link}
          href="/"
          className="d-flex align-items-center"
        >
          <img
            src="/Logo/Etsy%20Profile%20Image.png"
            alt="Etsy Profile"
            height="40"
            className="me-2"
          />

          Dante Smart Solutıons
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav-menu" />
        <Navbar.Collapse id="nav-menu">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/">
              Anasayfa
            </Nav.Link>
            <Nav.Link as={Link} href="/about">
              Hakkımızda
            </Nav.Link>
            <Nav.Link as={Link} href="/products">
              Ürünler
            </Nav.Link>
            <Nav.Link as={Link} href="/systems">
              Sistemler
            </Nav.Link>
            <Nav.Link as={Link} href="/contact">
              İletişim
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
