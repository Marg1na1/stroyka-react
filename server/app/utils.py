from datetime import datetime
from functools import wraps
from json import JSONEncoder
from typing import Type, Any

import jwt
from app import app
from app.models.user import User
from bson import ObjectId
from flask import request
from mongoengine import Document, ValidationError


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('X-Access-Token')

        if not token:
            return {'message': 'token is missing'}, 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except jwt.PyJWTError:
            return {'message': 'invalid token'}, 401

        if data.get('expires_at', 0) < datetime.utcnow().timestamp():
            return {'message': 'token expired, log in again'}

        current_user = User.objects(pk=data.get('user_id')).first()

        if not current_user:
            return {'message': 'token is invalid'}, 401

        return f(current_user, *args, **kwargs)

    return decorated


def to_dict(obj: Document, aliases: dict = None, *, exclude: list = None, reversed_: bool = False) -> dict:
    if not isinstance(obj, Document):
        raise ValueError('Invalid Mongo Document')

    dict_ = obj.to_mongo().to_dict()

    for field in (exclude or []):
        if field in dict_:
            del dict_[field]

    del dict_['_id']

    dict_ = organize_by_aliases(dict_, aliases or {}, reversed_=reversed_)

    return dict_


def organize_by_aliases(data: dict, aliases: dict, *, reversed_: bool = False) -> dict:
    data = data.copy()

    for to_get, to_set in aliases.items():
        if reversed_:
            to_get, to_set = to_set, to_get

        if to_get not in data:
            continue

        data[to_set] = data[to_get]
        del data[to_get]

    return data


def get_doc_by_id(doc_type: Type[Document], id_: Any):
    try:
        obj = doc_type.objects(pk=id_).first()
        return obj
    except ValidationError:
        return


class Serializer(JSONEncoder):
    def default(self, o: Any) -> Any:
        if isinstance(o, (ObjectId, datetime)):
            return str(o)
        return super().default(o)