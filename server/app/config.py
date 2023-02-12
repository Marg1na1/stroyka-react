import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = None
    DEBUG = False


class DevelopmentConfig(Config):
    SECRET_KEY = os.environ.get('SECRET_KEY', '')
    JSON_AS_ASCII = False
    DEBUG = True


MONGODB_HOST = os.environ['MONGODB_HOST']
MONGODB_PORT = os.environ['MONGODB_PORT']
MONGODB_NAME = os.environ['MONGODB_NAME']

MONGODB_URL = f'mongodb://{MONGODB_HOST}:{MONGODB_PORT}/{MONGODB_NAME}'
