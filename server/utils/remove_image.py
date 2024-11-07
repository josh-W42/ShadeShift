import os


def remove_image(path: str):
    """
    Attempt to safely remove a temporarily created file
    :param path: path to file
    """
    try:
        os.remove(path)
    except FileNotFoundError as e:
        print('Cannot remove a file that does not exist')

