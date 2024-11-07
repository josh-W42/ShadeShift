from datatypes import ALLOWED_EXTENSIONS


def is_file_allowed(file_name: str) -> bool:
    return file_name.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
