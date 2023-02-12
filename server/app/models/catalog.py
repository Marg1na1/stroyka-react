from mongoengine import *


class Subcatalog(EmbeddedDocument):
    title = StringField(null=True)
    path = StringField(null=True)


class Catalog(Document):
    title = StringField(required=True, null=False)
    image = StringField(null=True)
    list = EmbeddedDocumentListField(Subcatalog, null=True)

