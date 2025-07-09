from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman

app = Flask(__name__)

# 1) CORS: sadece API rotalarına ve kendi domain’e izin verin
CORS(app, resources={r"/api/*": {"origins": "https://seninsiten.com"}})

# 2) Rate limiting
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# 3) Security headers
Talisman(
    app,
    content_security_policy={
        'default-src': ["'self'"],
        'script-src': ["'self'", 'cdn.jsdelivr.net'],
        'style-src': ["'self'", 'cdn.jsdelivr.net']
    }
)

@app.route('/api/products')
@limiter.limit("10 per minute")
def products():
    return jsonify([
        {'id': 1, 'name': 'Akıllı Aydınlatma'},
        {'id': 2, 'name': 'Duman ve Gaz Alarmı'}
    ])

if __name__ == '__main__':
    app.run(debug=True)
