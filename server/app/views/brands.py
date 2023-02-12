from flask import Blueprint

from app.models.brand import Brand
from app.utils import to_dict, get_doc_by_id

brands_blueprint = Blueprint('brands', __name__)


@brands_blueprint.get('/')
def get_brands():
    brands = Brand.objects.all()

    return [to_dict(brand) for brand in brands]


@brands_blueprint.get('/<id_>')
def get_cart_by_id(user, id_):
    brand = get_doc_by_id(Brand, id_)

    if not brand:
        return {'message': 'brand with specified ID doesn\'t exist'}, 400

    return to_dict(brand)
