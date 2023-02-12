from flask import Blueprint

from app.models.documentation import Documentation
from app.utils import to_dict, get_doc_by_id

documentation_blueprint = Blueprint('documentation', __name__)


@documentation_blueprint.get('/')
def get_reviews():
    documentations = Documentation.objects.all()

    return [to_dict(doc) for doc in documentations]


@documentation_blueprint.get('/<id_>')
def get_documentation_by_id(user, id_):
    documentation = get_doc_by_id(Documentation, id_)

    if not documentation:
        return {'message': 'documentation with specified ID doesn\'t exist'}, 400

    return to_dict(documentation)
