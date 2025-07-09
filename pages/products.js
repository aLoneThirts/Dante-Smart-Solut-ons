// pages/products.js
import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Button,
  Form, Modal, Badge, Spinner, Alert,
  InputGroup, ButtonGroup, Offcanvas
} from 'react-bootstrap';
import {
  FaSearch, FaFilter, FaEye, FaShare,
  FaStar, FaShoppingCart, FaWhatsapp, FaTimes,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import Image from 'next/image';
import data from '../data/siteContent.json';

export default function Products() {
  const allProducts = data.products || [];
  const categories = [...new Set(allProducts.map(p => p.category))];

  // States
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modalProd, setModalProd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Animation effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filter, search]);

  // Filtered and sorted products
  const filtered = allProducts
    .filter(p =>
      (filter === 'All' || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'price': return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''));
        case 'name': return a.name.localeCompare(b.name);
        case 'category': return a.category.localeCompare(b.category);
        default: return 0;
      }
    });

  // Utility functions
  const fixSrc = (path) => {
    if (!path) return '/images/placeholder.jpg';
    return path.startsWith('http') || path.startsWith('/') ? path : `/${path}`;
  };

  const shareProduct = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.short,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  const whatsappMessage = (product) => {
    const message = `Merhaba! ${product.name} ürünü hakkında bilgi almak istiyorum. Fiyat: ${product.price}`;
    return `https://wa.me/905301234567?text=${encodeURIComponent(message)}`;
  };

  // Product images (assuming multiple images)
  const getProductImages = (product) => {
    const images = [product.img];
    if (product.images) {
      images.push(...product.images);
    }
    return images;
  };

  const nextImage = () => {
    const images = getProductImages(modalProd);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getProductImages(modalProd);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">Akıllı Ev Ürünlerimiz</h1>
              <p className="lead mb-4">Yaşam kalitenizi artıracak, teknolojinin gücüyle tasarlanmış akıllı ev çözümlerini keşfedin.</p>
              <Badge bg="warning" text="dark" className="fs-6 px-3 py-2">{allProducts.length}+ Ürün Seçeneği</Badge>
            </Col>
            <Col lg={4} className="text-center">
              <FaShoppingCart size={120} className="text-white opacity-75" />
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="mb-5">
        {/* Advanced Search & Filter Bar */}
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col lg={4}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Ürün ara (örn: aydınlatma, güvenlik...)"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border-0"
                  />
                </InputGroup>
              </Col>
              <Col lg={3}>
                <Form.Select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border-0"
                >
                  <option value="name">İsme Göre Sırala</option>
                  <option value="price">Fiyata Göre Sırala</option>
                  <option value="category">Kategoriye Göre Sırala</option>
                </Form.Select>
              </Col>
              <Col lg={3}>
                <ButtonGroup className="w-100">
                  <Button
                    variant={filter === 'All' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('All')}
                    size="sm"
                  >
                    Tümü ({allProducts.length})
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowFilters(true)}
                    size="sm"
                  >
                    <FaFilter /> Filtrele
                  </Button>
                </ButtonGroup>
              </Col>
              <Col lg={2} className="text-end">
                <ButtonGroup>
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                    onClick={() => setViewMode('grid')}
                    size="sm"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                    onClick={() => setViewMode('list')}
                    size="sm"
                  >
                    Liste
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Active Filters */}
        {filter !== 'All' && (
          <div className="mb-3">
            <Badge 
              bg="primary" 
              className="me-2 p-2 fs-6"
              onClick={() => setFilter('All')}
            >
              {filter} <FaTimes className="ms-1" />
            </Badge>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Ürünler yükleniyor...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filtered.length === 0 && (
          <Alert variant="info" className="text-center py-4">
            <h5>Aradığınız kriterlere uygun ürün bulunamadı</h5>
            <p>Arama terimini değiştirin veya filtreleri temizleyin</p>
            <Button variant="primary" onClick={() => {
              setSearch('');
              setFilter('All');
            }}>
              Filtreleri Temizle
            </Button>
          </Alert>
        )}

        {/* Products Grid/List */}
        {!loading && filtered.length > 0 && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small className="text-muted">{filtered.length} ürün bulundu</small>
            </div>

            <Row xs={1} md={viewMode === 'grid' ? 2 : 1} lg={viewMode === 'grid' ? 3 : 1} className="g-4">
              {filtered.map((p, index) => (
                <Col key={p.id}>
                  <Card className={`h-100 shadow-sm product-card ${viewMode === 'list' ? 'mb-3' : ''}`}>
                    {viewMode === 'grid' ? (
                      <>
                        <div className="position-relative overflow-hidden">
                          <Card.Img variant="top" src={fixSrc(p.img)} style={{ objectFit: 'cover', height: '220px' }} />
                          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 product-overlay">
                            <Button variant="light" className="me-2" onClick={() => setModalProd(p)}>
                              <FaEye /> Detay
                            </Button>
                          </div>
                          <Badge bg="primary" className="position-absolute bottom-0 start-0 m-2">{p.category}</Badge>
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <Card.Title className="h5 mb-0">{p.name}</Card.Title>
                            <Badge bg="success" className="fs-6">{p.price}</Badge>
                          </div>
                          <Card.Text className="text-muted flex-grow-1 small">{p.short}</Card.Text>
                          <div className="d-flex gap-2 mt-auto">
                            <Button variant="primary" size="sm" onClick={() => setModalProd(p)}>
                              <FaEye className="me-1" /> Detay Gör
                            </Button>
                            <Button variant="success" size="sm" as="a" href={whatsappMessage(p)} target="_blank">
                              <FaWhatsapp />
                            </Button>
                          </div>
                        </Card.Body>
                      </>
                    ) : (
                      /* List View */
                      <Row className="g-0">
                        <Col md={4}>
                          <Card.Img src={fixSrc(p.img)} style={{ objectFit: 'cover', height: '200px', width: '100%' }} />
                        </Col>
                        <Col md={8}>
                          <Card.Body className="d-flex flex-column h-100">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <Card.Title className="h5">{p.name}</Card.Title>
                              <Badge bg="success" className="fs-6">{p.price}</Badge>
                            </div>
                            <Badge bg="primary" className="align-self-start mb-2">{p.category}</Badge>
                            <Card.Text className="flex-grow-1">{p.short}</Card.Text>
                            <div className="d-flex gap-2">
                              <Button variant="primary" size="sm" onClick={() => setModalProd(p)}>
                                <FaEye className="me-1" /> Detay Gör
                              </Button>
                              <Button variant="success" size="sm" as="a" href={whatsappMessage(p)} target="_blank">
                                <FaWhatsapp className="me-1" /> WhatsApp
                              </Button>
                            </div>
                          </Card.Body>
                        </Col>
                      </Row>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      {/* Category Filter Offcanvas */}
      <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><FaFilter className="me-2" /> Kategori Filtreleri</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-grid gap-2">
            <Button variant={filter === 'All' ? 'primary' : 'outline-primary'} onClick={() => {
              setFilter('All');
              setShowFilters(false);
            }}>
              Tümü ({allProducts.length})
            </Button>
            {categories.map(cat => {
              const count = allProducts.filter(p => p.category === cat).length;
              return (
                <Button key={cat} variant={filter === cat ? 'primary' : 'outline-primary'} onClick={() => {
                  setFilter(cat);
                  setShowFilters(false);
                }} className="d-flex justify-content-between align-items-center">
                  <span>{cat}</span>
                  <Badge bg="secondary">{count}</Badge>
                </Button>
              );
            })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Enhanced Product Detail Modal */}
      {modalProd && (
        <Modal show onHide={() => setModalProd(null)} size="lg" centered className="product-modal">
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="d-flex align-items-center">
              <Badge bg="primary" className="me-2">{modalProd.category}</Badge>
              {modalProd.name}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-0">
            <Row className="g-0">
              {/* Image Gallery */}
              <Col md={6}>
                <div className="position-relative">
                  <img src={fixSrc(getProductImages(modalProd)[currentImageIndex])} alt={modalProd.name} className="img-fluid w-100" style={{ height: '400px', objectFit: 'cover' }} />
                  {getProductImages(modalProd).length > 1 && (
                    <>
                      <Button variant="dark" className="position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle" onClick={prevImage} style={{ width: '40px', height: '40px' }}>
                        <FaChevronLeft />
                      </Button>
                      <Button variant="dark" className="position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle" onClick={nextImage} style={{ width: '40px', height: '40px' }} >
                        <FaChevronRight />
                      </Button>
                    </>
                  )}
                </div>
              </Col>

              {/* Product Details */}
              <Col md={6} className="p-4">
                <div className="mb-3">
                  <h4 className="mb-2">{modalProd.name}</h4>
                  <div className="d-flex align-items-center mb-2">
                    <Badge bg="success" className="fs-5 me-2">{modalProd.price}</Badge>
                    <div className="text-warning">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      <small className="text-muted ms-1">(4.8/5)</small>
                    </div>
                  </div>
                </div>

                <p className="text-muted fst-italic mb-3">{modalProd.short}</p>
                
                <hr />
                
                <h6 className="mb-2">Ürün Özellikleri:</h6>
                <p className="mb-4">{modalProd.description}</p>

                <div className="d-grid gap-2">
                  <Button variant="success" size="lg" as="a" href={whatsappMessage(modalProd)} target="_blank" className="mb-2">
                    <FaWhatsapp className="me-2" /> WhatsApp ile Sipariş Ver
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .product-card:hover .product-overlay { opacity: 1 !important; }
        .bg-gradient-primary { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); }
        .product-modal .modal-content { border: none; border-radius: 15px; overflow: hidden; }
      `}</style>
    </>
  );
}