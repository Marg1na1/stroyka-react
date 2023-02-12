from mongoengine import *


class Brand(Document):
    title = StringField(required=True, null=False)
    list = ListField(default=[], null=False)
