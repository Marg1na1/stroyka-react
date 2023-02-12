from flask import Blueprint

from app.models.contact import Contact
from app.utils import to_dict, get_doc_by_id

contacts_blueprint = Blueprint('contacts', __name__)


@contacts_blueprint.get('/')
def get_delivery():
    contacts = Contact.objects.all()

    return [to_dict(contact) for contact in contacts]


@contacts_blueprint.get('/<id_>')
def get_contact_by_id(user, id_):
    contact = get_doc_by_id(Contact, id_)

    if not contact:
        return {'message': 'contact with specified ID doesn\'t exist'}, 400

    return to_dict(contact)
