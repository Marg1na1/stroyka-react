from flask import Blueprint, request
from pydantic import ValidationError

from app.models.review import Review
from app.schemas import ReviewCreate
from app.utils import token_required, to_dict

reviews_blueprint = Blueprint('reviews', __name__)


@reviews_blueprint.get('/')
def get_reviews():
    reviews = Review.objects.all()

    return [to_dict(review, aliases=Review.ALIASES) for review in reviews]


@reviews_blueprint.post('/')
@token_required
def post_review(current_user):
    if not request.is_json:
        return {'message': 'invalid json'}, 400

    try:
        review_schema = ReviewCreate.parse_obj(request.json)
    except ValidationError as e:
        return {'message': 'invalid review data', 'error': str(e)}, 400

    review = Review(**review_schema.dict())
    review.save()

    return to_dict(review, aliases=Review.ALIASES, exclude=['id'])
