from mongoengine import *


class Contact(Document):
    content = StringField(required=True, null=True)
    type = StringField(required=True, choices=['requisites', 'address'], null=True)


