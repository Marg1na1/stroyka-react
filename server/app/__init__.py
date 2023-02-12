from flask import Flask
from mongoengine import connect
from flask_cors import CORS

from app.config import MONGODB_URL

app = Flask(__name__)
app.config.from_object('app.config.DevelopmentConfig')
CORS(app)

connect(host=MONGODB_URL)

from app.views.auth import auth_blueprint
from app.views.products import products_blueprint
from app.views.reviews import reviews_blueprint
from app.views.footer import footer_blueprint
from app.views.documentation import documentation_blueprint
from app.views.delivery import delivery_blueprint
from app.views.contacts import contacts_blueprint
from app.views.catalog import catalog_blueprint
from app.views.brands import brands_blueprint
from app.views.cart import cart_blueprint
from app.views.orders import orders_blueprint

app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
app.register_blueprint(products_blueprint, url_prefix='/api/products')
app.register_blueprint(reviews_blueprint, url_prefix='/api/reviews')
app.register_blueprint(footer_blueprint, url_prefix='/api/footer')
app.register_blueprint(documentation_blueprint, url_prefix='/api/documentation')
app.register_blueprint(delivery_blueprint, url_prefix='/api/delivery')
app.register_blueprint(contacts_blueprint, url_prefix='/api/contacts')
app.register_blueprint(catalog_blueprint, url_prefix='/api/catalog')
app.register_blueprint(brands_blueprint, url_prefix='/api/brands')
app.register_blueprint(cart_blueprint, url_prefix='/api/cart')
app.register_blueprint(orders_blueprint, url_prefix='/api/orders')

from app.error_handlers import process_error

app.register_error_handler(Exception, process_error)
