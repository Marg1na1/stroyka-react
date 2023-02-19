from flask import Blueprint
from flask import request
from mongoengine import OperationError, ValidationError

from app.models.cart import Cart
from app.models.user import User
from app.models.product import Product
from app.utils import organize_by_aliases, get_doc_by_id
from app.utils import to_dict
from app.utils import token_required

cart_blueprint = Blueprint('cart', __name__)


# @cart_blueprint.get('/')
# @token_required
# def get_carts(user):
#     carts = Cart.objects.all()
#
#     return [to_dict(cart, aliases=Cart.ALIASES) for cart in carts]


@cart_blueprint.get('/')
@token_required
def get_cart(user: User):
    carts = Cart.objects(user=user)
    to_return = []
    for cart in carts:
        cart_dict = to_dict(cart)
        cart_dict['product'] = to_dict(cart.product, Product.ALIASES)
        cart_dict['user'] = str(cart.user.id)
        to_return.append(cart_dict)

    return to_return


@cart_blueprint.post('/')
@token_required
def post_cart(user: User):
    if not request.is_json:
        return {'message': 'invalid JSON'}, 400

    product_id = request.json.get('productId')
    count = request.json.get('count')

    product = get_doc_by_id(Product, product_id)
    if not product:
        return {'message': 'product with specified ID doesn\'t exist'}, 400
    try:
        cart = Cart(product=product, user=user, count=count)
        cart.save()
    except (OperationError, ValidationError) as e:
        return {'message': 'failed to save cart', 'error': str(e)}, 500

    cart_dict = to_dict(cart)
    cart_dict['product'] = to_dict(cart.product, Product.ALIASES)
    cart_dict['user'] = str(cart.user.id)
    return cart_dict


@cart_blueprint.put('/<product_id>')
@token_required
def put_cart(user: User, product_id: str):
    if not request.is_json:
        return {'message': 'invalid JSON'}, 400

    product = get_doc_by_id(Product, product_id)
    if not product:
        return {'message': 'product with specified ID doesn\'t exist'}, 400

    cart = Cart.objects(user=user, product=product).first()
    if not cart:
        return {'message': 'cart for specified product ID doesn\'t exist'}, 400
    count = request.json.get('count')
    cart.count = count or cart.count
    try:
        cart.save()
    except (OperationError, ValidationError) as e:
        return {'message': 'failed to save cart', 'error': str(e)}, 500

    cart_dict = to_dict(cart)
    cart_dict['product'] = to_dict(cart.product, Product.ALIASES)
    cart_dict['user'] = str(cart.user.id)
    return cart_dict


@cart_blueprint.delete('/<product_id>')
@token_required
def remove_product_from_cart(user, product_id):
    product = get_doc_by_id(Product, product_id)
    if not product:
        return {'message': 'product with specified ID doesn\'t exist'}, 400

    if cart := Cart.objects(user=user, product=product).first():
        cart.delete()
    return {'message': 'product removed from cart successfully'}


@cart_blueprint.delete('/')
@token_required
def delete_cart(user):
    carts = Cart.objects(user=user).all()

    for cart in carts:
        cart.delete()

    return {'message': 'cart deleted successfully'}
