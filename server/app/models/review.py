import os.path as pth
from mongoengine import *
from datetime import datetime

DEFAULT_IMG = pth.abspath(pth.join(pth.dirname(__file__), '..', 'static', 'img', 'unknown_user.jpg'))


class Review(Document):
    ALIASES = {'created_at': 'createdAt'}

    avatar = StringField(default=DEFAULT_IMG, null=False)
    content = StringField(required=True, null=False)
    created_at = DateTimeField(default=datetime.utcnow, null=False)
    name = StringField(required=True, null=False)

    meta = {'indexes': ['created_at']}


# p = Review(content='Что-то такое для поиска', name='Эмиль')
# p.save()
# p = Review(content='Тут тоже что-то напишу, чтобы можно было искать и использовать поиск лол', name='2')
# p.save()
#
#


