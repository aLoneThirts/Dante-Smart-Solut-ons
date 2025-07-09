import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [validated, setValidated] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500));
      setStatus({ type: 'success', message: 'Mesajınız başarıyla gönderildi!' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setValidated(false);
    } catch {
      setStatus({ type: 'danger', message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: '', message: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const contactInfo = [
    { icon: '📍', label: 'Adres', value: 'Levent Mah. Büyükdere Cad. No:185, Kağıthane' },
    { icon: '📞', label: 'Telefon', value: '+90 212 345 67 89' },
    { icon: '📧', label: 'Email', value: 'info@dantesmart.com.tr' }
  ];

  const workingHours = [
    { day: 'Pzt - Cmts', hours: '09:00 - 18:00' },
    { day: 'Cmt', hours: '10:00 - 16:00' },
    { day: 'Paz', hours: 'Kapalı' }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: '#' },
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-twitter', url: '#' }
  ];

  return (
    <div className="contact-page">
      <style>{`
        .contact-page { background: #f5f5f5; min-height: 100vh; padding: 2rem; }
        .contact-form-card,
        .info-card { background: #fff; border-radius: .5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 1.5rem; margin-bottom: 1.5rem;
        }
        .btn-submit { width: 100%; }
        .whatsapp-btn { position: fixed; bottom: 1rem; right: 1rem;
          width: 60px; height: 60px; display: flex;
          align-items: center; justify-content: center;
          border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="contact-form-card">
              <h3>Mesaj Gönderin</h3>
              {status.message && (
                <div className={`alert alert-${status.type}`}>
                  {status.message}
                </div>
              )}
              <form
                className={validated ? 'was-validated' : ''}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="mb-3">
                  <label className="form-label">Ad Soyad</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">Lütfen adınızı girin.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">Geçerli bir email girin.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Konu</label>
                  <select
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Konu seçin</option>
                    <option value="Akıllı Ev">Akıllı Ev</option>
                    <option value="Güvenlik">Güvenlik</option>
                    <option value="Destek">Destek</option>
                  </select>
                  <div className="invalid-feedback">Lütfen konu seçin.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Mesaj</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <div className="invalid-feedback">Lütfen mesaj yazın.</div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="info-card">
              <h5>İletişim Bilgileri</h5>
              {contactInfo.map((item, idx) => (
                <div key={idx} className="d-flex mb-2 align-items-center">
                  <span className="me-2">{item.icon}</span>
                  <div>
                    <strong>{item.label}:</strong> {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="info-card">
              <h5>Çalışma Saatleri</h5>
              {workingHours.map((h, idx) => (
                <div key={idx} className="d-flex justify-content-between mb-1">
                  <span>{h.day}</span>
                  <span>{h.hours}</span>
                </div>
              ))}
            </div>

            <div className="info-card">
              <h5>Sosyal Medya</h5>
              <div className="d-flex gap-3">
                {socialLinks.map((s, idx) => (
                  <a key={idx} href={s.url}>
                    <i className={`${s.icon} fa-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/905301234567"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success whatsapp-btn"
      >
        <i className="fab fa-whatsapp fa-2x"></i>
      </a>
    </div>
  );
}
