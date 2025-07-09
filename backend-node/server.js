const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// 1) HTTP Security Headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", 'cdn.jsdelivr.net']
    }
  })
);

// 2) CORS (sadece kendi domain’inize izin verin)
app.use(cors({ origin: 'https://seninsiten.com' }));

// 3) Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100 // IP başına 100 istek
  })
);

app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
