from mongoengine import *
from datetime import datetime

from app.models.product import Product


class Order(Document):
    ALIASES = {
        'created_at': 'createdAt'
    }

    key = ReferenceField(Product, required=True, null=False)
    created_at = DateTimeField(default=datetime.utcnow, null=False)
