import { useEffect, useState } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap'
import {
  FaBolt,
  FaShieldAlt,
  FaCogs,
  FaArrowUp,
  FaMoon,
  FaSun
} from 'react-icons/fa'
import Link from 'next/link'
import data from '../data/siteContent.json'

export default function Home() {
  const {
    hero,
    sections = [],
    services = [],
    testimonials = []
  } = data.home

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false)
  const [showTop, setShowTop] = useState(false)

  // Toggle body class for dark mode
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  // Scroll event listener for scroll-to-top button
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Helper to fix image paths
  const fixSrc = (path) => {
    if (!path) return ''
    return path.startsWith('http') || path.startsWith('/') ? path : `/${path}`
  }

  return (
    <>
      {/* SMTP.js for contact form emails */}
      <Script src="https://smtpjs.com/v3/smtp.js" />

      {/* Dark mode toggle button */}
      <div className="position-fixed top-0 end-0 m-3" style={{ zIndex: 9999 }}>
        <Button
          variant={darkMode ? 'light' : 'dark'}
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Açık Moda Geç' : 'Koyu Moda Geç'}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>
      </div>

      {/* Hero Section */}
      <header
        className="hero-logo-bg d-flex align-items-center justify-content-start position-relative"
        style={{ height: '80vh' }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={fixSrc(hero.logoBg || '/Logo/Etsy Shop Icon.png')}
            alt="Hero Background"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center', opacity: 0.2 }}
            priority
          />
        </div>
        <Container fluid className="h-100 position-relative" style={{ zIndex: 2 }}>
          <div className="row h-100">
            <div className="col-md-5 d-flex align-items-center">
              <div className="hero-content text-light ms-4">
                <h1 className="hero-title mb-3">{hero.title}</h1>
                <p className="hero-subtitle mb-4">{hero.subtitle}</p>
                <Link href={hero.ctaLink} passHref>
                  <Button size="lg" variant="light">{hero.cta}</Button>
                </Link>
              </div>
            </div>
            <div className="col-md-7" />
          </div>
        </Container>
      </header>

      {/* How It Works Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Nasıl Çalışır?</h2>
          <Row className="g-4">
            {sections.map((sec, i) => {
              const icons = [<FaBolt key={0} />, <FaShieldAlt key={1} />, <FaCogs key={2} />]
              return (
                <Col key={i} md={4}>
                  <Card className="text-center h-100 p-4 process-card">
                    <div className="icon-wrap mb-3">{icons[i]}</div>
                    <Card.Title>{sec.title}</Card.Title>
                    <Card.Text>{sec.text}</Card.Text>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>

      {/* Smart Home Systems Section */}
      {services.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <h2 className="text-center mb-4">Akıllı Ev Sistemleri</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
              {services.map((svc, i) => (
                <Col key={i}>
                  <Card className="service-card overflow-hidden position-relative">
                    <Image
                      src={fixSrc(svc.img)}
                      alt={svc.title}
                      width={500}
                      height={300}
                      className="card-img-top"
                    />
                    <div className="service-overlay position-absolute inset-0 d-flex flex-column justify-content-center align-items-center">
                      <h5 className="text-white">{svc.title}</h5>
                      <p className="text-white small">{svc.text}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Control Panels Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Kontrol Panelleri</h2>
          <Row xs={1} sm={2} md={3} className="g-4">
            {services.slice(0, 6).map((svc, i) => (
              <Col key={i}>
                <Card className="h-100 border-0 text-center p-3 shadow-sm">
                  <Image
                    src={fixSrc(svc.img)}
                    alt={svc.title}
                    width={100}
                    height={100}
                    className="mb-3"
                  />
                  <Card.Body>
                    <Card.Title>{svc.title}</Card.Title>
                    <Card.Text className="text-muted small">{svc.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Feature Images Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row xs={1} md={3} className="g-4">
            {['feature1', 'feature2', 'feature3'].map((img, i) => (
              <Col key={i}>
                <Card className="bg-dark text-white overflow-hidden">
                  <Image
                    src={`/images/${img}.jpg`}
                    alt={img}
                    width={400}
                    height={250}
                    className="card-img"
                  />
                  <Card.ImgOverlay className="d-flex align-items-end p-3">
                    <h5>{i===0 ? 'AKILLI EV ÇÖZÜMLERİ' : i===1 ? 'AKILLI EV TEKNOLOJİLERİ' : 'OTOMASYON NEDİR?'}</h5>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center">
        <Container>
          <h2 className="mb-3">Projeniz İçin İletişime Geçin</h2>
          <p className="mb-4 text-muted">
            Akıllı ev sistemleri ve multimedya otomasyon alanında tüm ihtiyaçlarınıza çözüm üreten Türkiye’nin ilk ve tek firmasıyız. Hemen bizimle iletişime geçin.
          </p>
          <Link href="https://wa.me/905301234567" passHref><Button variant="outline-success" className="me-3">7/24 WhatsApp Destek Hattı</Button></Link>
          <Link href="/contact" passHref><Button variant="primary">Proje Formu Doldur</Button></Link>
        </Container>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-5">
          <Container>
            <h2 className="text-center mb-4">Müşteri Görüşleri</h2>
            <Row xs={1} md={2} className="g-4">
              {testimonials.map((t, i) => (
                <Col key={i}>
                  <Card className="h-100 border-0 shadow-sm p-4">
                    <p className="fst-italic">“{t.quote}”</p>
                    <h5 className="mt-3 mb-1">{t.name}</h5>
                    <small className="text-muted">{t.role}</small>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Scroll to Top Button */}
      {showTop && (
        <Button className="scroll-top" variant="primary" aria-label="Yukarı Çık" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaArrowUp />
        </Button>
      )}

      {/* Global Dark Mode Styles */}
      <style jsx global>{`
        .dark-mode {
          background-color: #121212;
          color: #e0e0e0;
        }
        /* Ensure all text is clearly visible in dark mode */
        .dark-mode h1,
        .dark-mode h2,
        .dark-mode h3,
        .dark-mode h4,
        .dark-mode h5,
        .dark-mode h6,
        .dark-mode p,
        .dark-mode li,
        .dark-mode a {
          color: #ffffff !important;
        }
        .dark-mode .text-muted {
          color: #bbbbbb !important;
        }
        .dark-mode .text-light {
          color: #f8f9fa !important;
        }
        .dark-mode .bg-light {
          background-color: #1e1e1e !important;
        }
        .dark-mode .card {
          background-color: #1e1e1e !important;
          color: #e0e0e0 !important;
        }
        .dark-mode .btn-light {
          background-color: #333 !important;
          color: #f1f1f1 !important;
        }
        .dark-mode .btn-outline-success {
          border-color: #28a745;
          color: #28a745;
        }
        .dark-mode .btn-primary {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
      `}</style>
    </>
  )
}
