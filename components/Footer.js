// components/Footer.js
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="site-footer text-white py-3 mt-auto">
      <Container>
        {/* gx-5 ile sütunlar arasındaki yatay boşluğu artırıyoruz */}
        <Row className="gy-3 gx-5">
          {/* Hakkımızda */}
          <Col md={4} sm={12}>
            <h6 className="footer-title">Dante Smart Solutions</h6>
            <p className="footer-text">
              Güvenlikten konfora, enerjiden otomasyona tam entegre çözümler.
            </p>
          </Col>

          {/* Hızlı Linkler */}
          <Col md={4} sm={12}>
            <h6 className="footer-title">Hızlı Linkler</h6>
            <Nav className="flex-column footer-links">
              <Nav.Link href="/">Anasayfa</Nav.Link>
              <Nav.Link href="/about">Hakkımızda</Nav.Link>
              <Nav.Link href="/products">Ürünler</Nav.Link>
              <Nav.Link href="/systems">Sistemler</Nav.Link>
              <Nav.Link href="/contact">İletişim</Nav.Link>
             <Nav.Link href="/insights">Haberler</Nav.Link>
            </Nav>
          </Col>

          {/* Sosyal & İletişim */}
          <Col md={4} sm={12}>
            <h6 className="footer-title">Bize Ulaşın</h6>
            <p className="footer-text mb-1">info@dantesmart.com.tr</p>
            <p className="footer-text mb-2">+90 212 000 00 00</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <small className="footer-copy">
              © {new Date().getFullYear()} Dante Smart Solutions. Tüm hakları saklıdır.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
