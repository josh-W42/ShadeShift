import os.path
import time

from flask import Flask, request, jsonify
from utils import extract_colors, is_file_allowed, remove_image
from flask_cors import CORS
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './temp'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, resources={
    r'/api/*': {
        "origins": ["http://localhost:5173"]
    }
})


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


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000, debug=True)
