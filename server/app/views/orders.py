from flask import Blueprint
from flask import request
from mongoengine import OperationError, ValidationError

from app.models.order import Order, Item
from app.models.product import Product
from app.utils import organize_by_aliases, get_doc_by_id
from app.utils import to_dict
from app.utils import token_required

orders_blueprint = Blueprint('orders', __name__)


@orders_blueprint.get('/')
@token_required
def get_orders(user):
    orders = Order.objects(user=user)

    to_return = []

    for order in orders:
        order_dict = to_dict(order, Order.ALIASES)

        for item, item_dict in zip(order.items, order_dict['items']):
            try:
                product_dict = to_dict(item.product, Product.ALIASES)
                item_dict['product'] = product_dict
            except (ValidationError, OperationError):
                item_dict['product'] = 'unknown'

        to_return.append(order_dict)

    return to_return


@orders_blueprint.post('/')
@token_required
def post_order(user):
    if not request.is_json:
        return {'message': 'invalid JSON'}, 400

    processed_json = organize_by_aliases(request.json, Order.ALIASES, reversed_=True)

    try:
        order = Order(**processed_json, user=user)
        order.save()
        return to_dict(order, Order.ALIASES)
    except (OperationError, ValidationError) as e:
        return {'message': 'invalid order data', 'error': str(e)}, 400


# @orders_blueprint.get('/<id_>')
# @token_required
# def get_order_by_id(user, id_):
#     order = get_doc_by_id(Order, id_)
#     if not order:
#         return {'message': 'cart with specified ID doesn\'t exist'}, 400
#
#     return to_dict(order, Order.ALIASES) | {'key': to_dict(order.key)}


# @orders_blueprint.put('/<id_>')
# @token_required
# def put_order(user, id_):
#     if not request.is_json:
#         return {'message': 'invalid JSON'}, 400
#
#     processed_json = organize_by_aliases(request.json, Order.ALIASES, reversed_=True)
#
#     order = get_doc_by_id(Order, id_)
#     if not order:
#         return {'message': 'order with specified ID doesn\'t exist'}, 400
#
#     for k, v in processed_json.items():
#         if k == 'key' and not get_doc_by_id(Product, v):
#             return {'message': 'invalid product ID'}, 400
#         setattr(order, k, v)
#
#     try:
#         order.save()
#     except (OperationError, ValidationError) as e:
#         return {'message': 'invalid order data', 'error': str(e)}, 400
#
#     return to_dict(order, Order.ALIASES) | {'key': to_dict(order.key)}
#
#
# @orders_blueprint.delete('/<id_>')
# @token_required
# def delete_cart(user, id_):
#     order = get_doc_by_id(Order, id_)
#     if not order:
#         return {'message': 'order with specified ID doesn\'t exist'}, 400
#
#     order.delete()
#     return {'message': 'order was deleted successfully'}
