from mongoengine import *
from datetime import datetime

from app.models.product import Product
from app.models.user import User


class Item(EmbeddedDocument):
    ALIASES = {'product': 'productId'}

    product = ReferenceField(Product, required=True, null=False)
    count = IntField(required=True, null=False, min_value=1)

    meta = {"strict": False}


class Order(Document):
    ALIASES = {
        'created_at': 'createdAt'
    }

    user = ReferenceField(User, required=True, null=False)
    items = EmbeddedDocumentListField(Item, required=True, null=False)
    created_at = DateTimeField(default=datetime.utcnow, null=False)

    meta = {"strict": False}
