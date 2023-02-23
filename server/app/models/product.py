import os.path as pth

from mongoengine import *

DEFAULT_IMG = pth.abspath(pth.join(pth.dirname(__file__), '..', 'static', 'img', 'not_found.jpg'))


class Product(Document):
    ALIASES = {'discount_amount': 'discountAmount'}

    title = StringField(required=True, null=False)
    price = IntField(required=True, null=False, min_value=0)
    provider = StringField(required=True, null=False)
    img = StringField(default=DEFAULT_IMG, null=False)
    rating = IntField(default=0, null=False)
    type = StringField(default='unknown', null=False)
    discount = BooleanField(default=False, null=False)
    discount_amount = IntField(null=False, min_value=0)

    meta = {'indexes': ['title', 'price', 'rating', {'fields': ['$title']},
                        'type', 'provider', 'discount'],
            'strict': False}
