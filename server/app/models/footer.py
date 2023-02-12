from mongoengine import *


class Footer(Document):
    text = StringField(required=True, null=False)
    path = StringField(required=True, null=False)