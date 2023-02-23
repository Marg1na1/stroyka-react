import re

from flask import Blueprint
from flask import request

from app.models.product import Product
from app.utils import to_dict, get_doc_by_id

products_blueprint = Blueprint('products', __name__)

SECONDS_IN_DAY = 24 * 60 * 60
SORTING_OPTIONS = {'popular': '-rating', 'cheaper': '+price', 'expensive': '-price', 'alphabetically': 'title'}


@products_blueprint.get('/')
def get_products():
    sort_by = request.args.get('sortBy', 'popular')
    search_query = request.args.get('q')
    count = request.args.get('count', 0)
    range_ = request.args.get('range')
    discount = request.args.get('discount')
    type_ = request.args.get('type')
    provider = request.args.get('provider')

    query = Product.objects
    if search_query:
        query = query(title=re.compile(rf'.*{search_query}.*', re.IGNORECASE))
    if range_:
        min_, max_ = range_.split(',')
        query = query(price__lte=max_, price__gte=min_)
    if discount:
        # discount = True if discount == 'true' else False
        query = query(discount=discount)
    if type_:
        query = query(type=type_)
    if provider:
        query = query(provider=provider)

    query = query.order_by(SORTING_OPTIONS[sort_by]).limit(int(count))

    return [to_dict(product, Product.ALIASES) for product in query]


@products_blueprint.get('/<id_>')
def get_product_by_id(id_):
    product = get_doc_by_id(Product, id_)

    if not product:
        return {'message': 'product with specified ID doesn\'t exist'}, 400

    return to_dict(product, Product.ALIASES)
