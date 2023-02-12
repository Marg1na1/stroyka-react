from mongoengine import *
from datetime import datetime


class Cart(Document):
    ALIASES = {
        'created_at': 'createdAt',
        'final_price': 'finalPrice'
    }

    created_at = DateTimeField(default=datetime.utcnow, null=False)
    img = StringField(null=True)
    title = StringField(required=True, null=False)
    final_price = IntField(null=True)
    provider = StringField(null=True)
    count = IntField(null=True)
