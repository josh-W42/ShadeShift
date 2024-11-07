import os.path

from flask import Flask, request, jsonify
from utils import is_file_allowed, extract_colors
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/temp'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def hello_world():
    return '<h1>Hello World</h1>'


@app.route('/images/extract', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image = request.files['image']

    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not is_file_allowed(image.filename):
        return jsonify({'error': 'Invalid file type uploaded.'}), 400

    filename = secure_filename(image.filename)
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    try:
        image.save(path)
    except Exception as e:
        return jsonify({'error': 'Failed to save image', 'message': str(e)}), 500

    try:
        results = extract_colors(path, 5)
        return jsonify({'message': 'Image uploaded successfully', 'data': results}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to extract color from image', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000, debug=True)
