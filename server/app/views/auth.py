from datetime import datetime

import jwt
from flask import Blueprint
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash

from app import app
from app.models.user import User

auth_blueprint = Blueprint('auth', __name__)

SECONDS_IN_DAY = 24 * 60 * 60


@auth_blueprint.post('/login')
def login():
    auth_form = request.json

    email, password = auth_form.get('email'), auth_form.get('password')
    if not email or not password:
        return {'message': 'email and password required'}, 401

    user = User.objects(email=email).first()

    if not user:
        return {'message': 'user doesn\'t exist'}, 401

    if check_password_hash(user.password, password):
        token = jwt.encode({'user_id': str(user.id),
                            'expires_at': datetime.utcnow().timestamp() + SECONDS_IN_DAY},
                           app.config['SECRET_KEY'])

        return {'token': token}

    return {'message': 'wrong password'}


@auth_blueprint.post('/sign_up')
def sign_up():
    form = dict(request.json)

    req_fields = ('name', 'lastName', 'email', 'password')

    if not all(form.get(field) for field in req_fields):
        return {'message': 'not all required fields are filled in'}, 401

    user = User.objects(email=form['email']).first()

    if user:
        return {'message': 'user already exists'}, 409

    form['password'] = generate_password_hash(form['password'])
    user = User(**{(field if field != 'lastName' else 'last_name'): form[field] for field in req_fields})
    user.save()

    return {'message': 'registered successfully'}
