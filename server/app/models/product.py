import os.path as pth

from mongoengine import *

DEFAULT_IMG = pth.abspath(pth.join(pth.dirname(__file__), '..', 'static', 'img', 'not_found.jpg'))


class Product(Document):
    title = StringField(required=True, null=False)
    price = IntField(required=True, null=False)
    provider = StringField(required=True, null=False)
    img = StringField(default=DEFAULT_IMG, null=False)
    rating = IntField(default=0, null=False)
    type = StringField(default='unknown', null=False)
    discount = BooleanField(default=False, null=False)

    meta = {'indexes': ['title', 'price', 'rating', {'fields': ['$title']}]}
