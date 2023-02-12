from flask import Blueprint

from app.models.footer import Footer
from app.utils import to_dict, get_doc_by_id

footer_blueprint = Blueprint('footer', __name__)


@footer_blueprint.get('/')
def get_reviews():
    footers = Footer.objects.all()

    return [to_dict(footer) for footer in footers]


@footer_blueprint.get('/<id_>')
def get_footer_by_id(user, id_):
    footer = get_doc_by_id(Footer, id_)

    if not footer:
        return {'message': 'footer with specified ID doesn\'t exist'}, 400

    return to_dict(footer)
