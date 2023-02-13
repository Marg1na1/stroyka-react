from mongoengine import *


class User(Document):
    ALIASES = {'last_name': 'lastName'}

    name = StringField(required=True, null=False)
    last_name = StringField(required=True, null=False)
    email = StringField(required=True, null=False)
    password = StringField(required=True, null=False)
