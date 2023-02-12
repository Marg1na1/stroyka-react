from flask import Blueprint

from app.models.delivery import Delivery
from app.utils import to_dict, get_doc_by_id

delivery_blueprint = Blueprint('delivery', __name__)


@delivery_blueprint.get('/')
def get_delivery():
    deliveries = Delivery.objects.all()

    return [to_dict(delivery) for delivery in deliveries]


@delivery_blueprint.get('/<id_>')
def get_delivery_by_id(user, id_):
    delivery = get_doc_by_id(Delivery, id_)

    if not delivery:
        return {'message': 'delivery with specified ID doesn\'t exist'}, 400

    return to_dict(delivery)
