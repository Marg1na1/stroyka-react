from mongoengine import *

from app.models.product import Product
from app.models.user import User


class Cart(Document):
    count = IntField(required=True, default=0, null=False, min_value=0)
    product = ReferenceField(Product, required=True)
    user = ReferenceField(User, required=True)

    meta = {
        'index_background': True,
        'indexes': [
            {
                'fields': ('user', 'product'),
                'unique': True
            }
        ]
    }
