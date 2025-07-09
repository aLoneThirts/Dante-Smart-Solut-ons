import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaMoon, FaSun, FaBullseye, FaEye, FaHeart } from 'react-icons/fa';
import data from '../data/siteContent.json';

export default function About() {
  const { title, subtitle, text, mission, vision, values, team, timeline } = data.about;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <>
      <div className="position-fixed top-0 end-0 m-3" style={{ zIndex: 9999 }}>
        <Button
          variant={darkMode ? 'light' : 'dark'}
          onClick={() => setDarkMode(!darkMode)}
          style={{ width: 50, height: 50, borderRadius: '50%' }}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </Button>
      </div>

      <Container className="my-5">
        {/* Header */}
        <header className="text-center mb-5">
          <h1 className="display-3 fw-bold">{title}</h1>
          <p className="lead text-muted fs-5">{subtitle}</p>
        </header>

        {/* Intro Text */}
        <section className="mb-5">
          <p className="mx-auto fs-5" style={{ maxWidth: 800 }}>{text}</p>
        </section>

        {/* Mission & Vision */}
        <Row className="mb-5 g-4">
          {[mission, vision].map((item, idx) => (
            <Col key={idx} md={6}>
              <Card className="h-100 border-0 shadow-sm text-center py-4 px-3">
                <Card.Body>
                  <Card.Title className="fw-bold fs-4 d-flex align-items-center justify-content-center">
                    {idx === 0 ? <FaBullseye className="me-2 text-primary" /> : <FaEye className="me-2 text-success" />} 
                    {item.heading}
                  </Card.Title>
                  <Card.Text className="fs-6 text-secondary">{item.body}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Values */}
        <section className="mb-5 text-center">
          <h3 className="fw-bold mb-4">Değerlerimiz</h3>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {values.map((v, i) => (
              <Badge key={i} bg="secondary" pill className="fs-6 py-2 px-3">
                <FaHeart className="me-1" /> {v}
              </Badge>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-5">
          <h3 className="text-center fw-bold mb-4">Ekibimiz</h3>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {team.map((member, idx) => (
              <Col key={idx} className="d-flex justify-content-center">
                <Card className="border-0 shadow-sm text-center p-3" style={{ width: 240 }}>
                  <div className="rounded-circle bg-light mx-auto mb-3" style={{ width: 100, height: 100 }}>
                    {/* Placeholder for photo */}
                  </div>
                  <Card.Title className="fs-5 fw-semibold">{member.name}</Card.Title>
                  <Card.Text className="text-muted mb-0">{member.role}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Timeline */}
        <section className="mb-5">
          <h3 className="fw-bold mb-4">Tarihçemiz</h3>
          <Row className="g-4">
            {timeline.map((item, idx) => (
              <Col key={idx} md={4}>
                <Card className="border-0 shadow-sm p-4 text-center">
                  <Card.Title className="fw-bold display-6 text-primary">{item.year}</Card.Title>
                  <Card.Text className="fs-6 text-secondary">{item.event}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>

      {/* Global Dark Mode Styles */}
      <style jsx global>{`
        .dark-mode { background: #121212; color: #e0e0e0; }
        .dark-mode .text-muted { color: #aaa; }
        .dark-mode .card { background: #1e1e1e !important; color: #e0e0e0; }
        .dark-mode .btn-outline-secondary { color: #fff; border-color: #444; }
        .dark-mode .lead { color: #ccc; }
      `}</style>
    </>
  );
}
