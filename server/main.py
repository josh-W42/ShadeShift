import os
import time

from flask import request, jsonify, session
from werkzeug.utils import secure_filename

from utils import extract_colors, is_file_allowed, remove_image
from models import User
from config import app, db

with app.app_context():
    db.create_all()


@app.route('/')
def hello_world():
    return '<h1>Hello World</h1>'


@app.route('/api/images/extract', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image = request.files['image']

    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not is_file_allowed(image.filename):
        return jsonify({'error': 'Invalid file type uploaded.'}), 400

    filename = f'{time.time()}-{secure_filename(image.filename)}'
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    try:
        image.save(path)
    except Exception as e:
        return jsonify({'error': 'Failed to save image', 'message': str(e)}), 500

    try:
        results = extract_colors(path, 5)
        results = results.tolist()
        remove_image(path)
        return jsonify({'message': 'Successfully extracted color data', 'data': results}), 200
    except Exception as e:
        remove_image(path)
        return jsonify({'error': 'Failed to extract color data from image', 'message': str(e)}), 500


@app.route('/api/users')
def get_users():
    try:
        users = [{ 'id': user.id, 'username': user.username } for user in User.query.all()]
        return jsonify({'data': users }), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to get users', 'message': str(e)}), 500


@app.route('/api/users/create', methods=["POST"])
def user_create():

    try:
        data = request.get_json()

        user = User(
            username=data['username']
        )

        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return jsonify({'data': {'user': {'id': user.id, 'username': user.username}}}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to sign up user', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000, debug=True)
