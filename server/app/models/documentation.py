from mongoengine import *


class Documentation(Document):
    title = StringField(required=True, null=False)
    token = StringField(required=True, null=False)