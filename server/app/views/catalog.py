from flask import Blueprint

from app.models.catalog import Catalog
from app.utils import to_dict, get_doc_by_id

catalog_blueprint = Blueprint('catalog', __name__)


@catalog_blueprint.get('/')
def get_catalog():
    catalogs = Catalog.objects.all()

    return [to_dict(catalog) for catalog in catalogs]


@catalog_blueprint.get('/<id_>')
def get_catalog_by_id(user, id_):
    catalog = get_doc_by_id(Catalog, id_)

    if not catalog:
        return {'message': 'catalog with specified ID doesn\'t exist'}, 400

    return to_dict(catalog)
