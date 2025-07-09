import React, { useState, useEffect } from 'react';

const mockData = [
  { id: 1, name: "Akıllı Ev Sistemi Pro", category: "Genel", short: "Tam kapsamlı akıllı ev yönetim sistemi", description: "Işık, klima, güvenlik, enerji yönetimi ve mobil uygulama ile tam kontrol.", features: ["Uzaktan kontrol", "Enerji optimizasyonu", "Senaryo oluşturma"], img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400" },
  { id: 2, name: "Akıllı Termostat", category: "Isıtma/Soğutma", short: "Otomatik sıcaklık kontrolü ve enerji tasarrufu", description: "Evinizin sıcaklığını sensörler ve mobil uygulama ile ideal seviyede tutar.", features: ["Otomatik öğrenme", "Enerji raporları", "Uzaktan ayar"], img: "https://images.unsplash.com/photo-1582719478325-3a16a68d8d13?w=400" },
  { id: 3, name: "Akıllı Kapı Kilidi", category: "Güvenlik", short: "Anahtarsız giriş ve güvenlik kontrolü", description: "Parmak izi, PIN veya mobil uygulama ile güvenli kapı kilidi.", features: ["Farklı giriş metotları", "Zamanlı erişim", "Giriş log'u"], img: "https://images.unsplash.com/photo-1572372121725-3d22d5b5a1c6?w=400" },
  { id: 4, name: "Güvenlik Kamera Sistemi", category: "Güvenlik", short: "HD görüntü ve gece görüş desteği", description: "4K çözünürlük, hareket algılama ve bulut depolama opsiyonları.", features: ["Hareket algılama", "Canlı izleme", "Bulut kayıt"], img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400" },
  { id: 5, name: "Duman ve Gaz Sensörü", category: "Güvenlik", short: "Erken uyarı sistemi ile güvenlik artırma", description: "Duman ve tehlikeli gaz sızıntılarını anlık tespit eder.", features: ["Anlık alarm", "Mobil bildirim", "Test modu"], img: "https://images.unsplash.com/photo-1576675787761-47f0d30f7f35?w=400" },
  { id: 6, name: "Akıllı Aydınlatma", category: "Aydınlatma", short: "RGB ve beyaz ton seçenekleriyle ışık kontrolü", description: "Zamanlama, renk döngüsü ve sesle kontrol özellikleri.", features: ["Senaryo modları", "Sesli kontrol", "Enerji ölçüm"], img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400" },
  { id: 7, name: "Ses Sistemi Premium", category: "Eğlence", short: "Dolby Atmos destekli multiroom ses deneyimi", description: "Kablosuz müzik yayını, çoklu oda senkronizasyonu.", features: ["Dolby Atmos", "Wi-Fi albümler", "Çok odalı kontrol"], img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400" },
  { id: 8, name: "Akıllı Sulama Sistemi", category: "Bahçe", short: "Toprak nem sensörlü otomatik sulama", description: "Hava durumuna göre sulama zamanlayıcıları.", features: ["Nem sensörü", "Hava entegrasyonu", "Mobil kontrol"], img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
  { id: 9, name: "Akıllı Pencere Sensörü", category: "Güvenlik", short: "Açık/kapalı durum takibi ve alarm", description: "Pencere açıldığında bildirim ve alarm özelliği.", features: ["Çift yönlü iletişim", "Bildirimler", "Kolay kurulum"], img: "https://images.unsplash.com/photo-1582181298374-2f1dbb4ef07c?w=400" },
  { id: 10, name: "Akıllı Yangın Alarmı", category: "Güvenlik", short: "Duman ve sıcaklık sensörlü erken uyarı", description: "Hem duman hem de aşırı sıcaklık tespitinde alarm.", features: ["Çift sensör", "Mobil uyarı", "Test fonksiyonu"], img: "https://images.unsplash.com/photo-1580414057643-3770c8e6b257?w=400" }
];

export default function SmartSystems() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tümü');
  const [modal, setModal] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Tümü', ...new Set(mockData.map(p => p.category))];
  const filtered = mockData
    .filter(p =>
      (filter === 'Tümü' || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    const cards = document.querySelectorAll('.fade-up');
    cards.forEach((card, i) => {
      card.style.animationDelay = `${i * 100}ms`;
      card.classList.add('animate');
    });
  }, [filtered]);

  const getBadgeClass = (cat) => {
    switch (cat) {
      case 'Güvenlik': return 'bg-danger';
      case 'Aydınlatma': return 'bg-warning';
      case 'Genel': return 'bg-primary';
      case 'Isıtma/Soğutma': return 'bg-info';
      case 'Eğlence': return 'bg-success';
      case 'Bahçe': return 'bg-secondary';
      default: return 'bg-dark';
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <style jsx>{`
        .fade-up { opacity: 0; transform: translateY(20px); transition: all 0.5s ease-out; }
        .animate { opacity: 1; transform: translateY(0); }
      `}</style>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">Akıllı Ev Sistemlerimiz</h1>
          <p className="text-muted">Yaşam kalitenizi artıracak tüm çözümler</p>
          <button className="btn btn-outline-secondary" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? '🔽 Filtreleri Gizle' : '🔍 Filtreleri Göster'}
          </button>
        </div>

        {showFilters && (
          <div className="mb-4 p-3 bg-white rounded shadow-sm">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sistem ara..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {filtered.map(system => (
            <div key={system.id} className="col-md-6 col-lg-4 mb-4 fade-up">
              <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden hover-scale">
                <div className="position-relative">
                  <img src={system.img} alt={system.name} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} />
                  <span className={`badge ${getBadgeClass(system.category)} position-absolute top-0 start-0 m-2`}>{system.category}</span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold fs-5 mb-2">{system.name}</h5>
                  <p className="card-text text-muted flex-grow-1">{system.short}</p>
                  <button className="btn btn-primary rounded-pill mt-3" onClick={() => setModal(system)}>
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modal && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content rounded-4">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">{modal.name}</h5>
                  <button type="button" className="btn-close" onClick={() => setModal(null)}></button>
                </div>
                <div className="modal-body row g-4">
                  <div className="col-md-6">
                    <img src={modal.img} alt={modal.name} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-6">
                    <span className={`badge ${getBadgeClass(modal.category)} mb-3 px-3 py-2`}>{modal.category}</span>
                    <p className="fs-5 text-secondary">{modal.description}</p>
                    <h6 className="text-dark mt-4 mb-2">Öne Çıkan Özellikler:</h6>
                    <ul className="list-group mb-3">
                      {modal.features.map((f, i) => (
                        <li key={i} className="list-group-item">🔹 {f}</li>
                      ))}
                    </ul>
                    <button className="btn btn-success rounded-pill" onClick={() => setModal(null)}>Kapat</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}