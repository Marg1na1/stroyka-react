from werkzeug.exceptions import HTTPException


def process_error(e: HTTPException):
    return {"message": e.description}, e.code
