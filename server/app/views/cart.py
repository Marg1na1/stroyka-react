from flask import Blueprint
from flask import request
from mongoengine import OperationError, ValidationError

from app.models.cart import Cart
from app.utils import organize_by_aliases, get_doc_by_id
from app.utils import to_dict
from app.utils import token_required

cart_blueprint = Blueprint('cart', __name__)


@cart_blueprint.get('/')
@token_required
def get_carts(user):
    carts = Cart.objects.all()

    return [to_dict(cart, aliases=Cart.ALIASES) for cart in carts]


@cart_blueprint.get('/<id_>')
@token_required
def get_cart_by_id(user, id_):
    cart = get_doc_by_id(Cart, id_)

    if not cart:
        return {'message': 'cart with specified ID doesn\'t exist'}, 400

    return to_dict(cart, aliases=Cart.ALIASES)


@cart_blueprint.post('/')
@token_required
def post_cart(user):
    if not request.is_json:
        return {'message': 'invalid JSON'}, 400

    processed_json = organize_by_aliases(request.json, Cart.ALIASES, reversed_=True)

    try:
        cart = Cart(**processed_json)
        cart.save()
        return to_dict(cart, aliases=Cart.ALIASES)

    except (OperationError, ValidationError) as e:
        return {'message': 'invalid cart data', 'error': str(e)}, 400


@cart_blueprint.put('/<id_>')
@token_required
def put_cart(user, id_):
    if not request.is_json:
        return {'message': 'invalid JSON'}, 400

    processed_json = organize_by_aliases(request.json, Cart.ALIASES, reversed_=True)

    cart = get_doc_by_id(Cart, id_)
    if not cart:
        return {'message': 'cart with specified ID doesn\'t exist'}, 400

    for k, v in processed_json.items():
        setattr(cart, k, v)

    try:
        cart.save()
    except (OperationError, ValidationError) as e:
        return {'message': 'invalid cart data', 'error': str(e)}, 400

    return to_dict(cart, aliases=Cart.ALIASES)


@cart_blueprint.delete('/<id_>')
@token_required
def delete_cart(user, id_):
    cart = get_doc_by_id(Cart, id_)
    if not cart:
        return {'message': 'cart with specified ID doesn\'t exist'}, 400

    cart.delete()
    return {'message': 'cart was deleted successfully'}
