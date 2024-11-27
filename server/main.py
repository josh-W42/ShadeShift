import os
import time

from flask import request, jsonify, session
from flask_login import login_required, login_user, current_user, logout_user
from werkzeug.utils import secure_filename
from sqlalchemy import select, exists

from utils import extract_colors, is_file_allowed, remove_image
from models import User, Palette
from config import app, db, login_manager

with app.app_context():
    db.create_all()


@login_manager.user_loader
def load_user(user_id):
    try:
        return db.session.execute(select(User).where(User.id == user_id)).scalar_one_or_none()
    except Exception as _:
        return None


@app.route('/')
def hello_world():
    return '<h1>Hello World</h1>'


@app.route('/api/login', methods=["POST"])
def login():
    try:
        data = request.get_json()

        user = db.session.execute(select(User).where(User.username == data['username'])).scalar_one_or_none()
        password = data['password']

        if not user:
            return jsonify({'message': 'User Not Found'}), 404

        if user.authenticate(password):
            login_user(user)

            return jsonify(
                {
                    'data': {
                        'user': {
                            'id': user.id,
                            'username': user.username,
                            'palettes': [{ 'id': palette.id, 'colors': palette.colors } for palette in user.palettes]
                        }
                    }
                }
            ), 200
        else:
            return jsonify({'message': 'Username or Password is Incorrect'}), 403

    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to sign up user', 'message': str(e)}), 500


@app.route('/api/logout')
def logout():
    try:
        logout_user()

        return jsonify({ 'message': 'success' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'Error': 'Failed to log out user'  }), 500

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
        users = [
            {
                'id': user.id,
                'username': user.username,
                'palettes': [{ 'id': palette.id, 'colors': palette.colors } for palette in user.palettes]
            } for user in User.query.all()
        ]
        return jsonify({'data': users}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to get users', 'message': str(e)}), 500


@app.route('/api/users', methods=["POST"])
def user_create():

    try:
        data = request.get_json()

        user = User(username=data['username'])

        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()

        login_user(user)

        return jsonify({'data': {'user': {'id': user.id, 'username': user.username, 'palettes': user.palettes}}}), 201
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to sign up user', 'message': str(e)}), 500


@app.route('/api/users/palettes', methods=['POST'])
@login_required
def save_palette():

    try:
        user: User = current_user

        data = request.get_json()
        color_sequence = data['colors']

        palette = (db.session.execute(
            select(Palette)
            .where(Palette.colors == color_sequence))
            .scalar_one_or_none()
        )

        if not palette:
            palette = Palette(
                colors=color_sequence,
                users=[user]
            )

            db.session.add(palette)
            db.session.commit()

        return jsonify(
            {'data':
                 {
                    'id': palette.id,
                    'colors': palette.colors,
                    'users': [{ 'username': user.username } for user in palette.users]
                 }
            }
        ), 200
    except Exception as e:
        return jsonify({ 'error': 'Failed to save palette', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000, debug=True)
