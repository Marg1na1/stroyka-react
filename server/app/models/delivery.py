from mongoengine import *


class Answer(EmbeddedDocument):
    text = StringField(null=True)
    text1 = StringField(null=True)


class Delivery(Document):
    question = StringField(required=True, null=True)
    answer = EmbeddedDocumentField(Answer, required=True, null=True)
