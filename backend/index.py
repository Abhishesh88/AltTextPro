from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return jsonify({
        "status": "running",
        "endpoints": {
            "process_image": "/api/process-image"
        }
    })

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/api/process-image', methods=['POST'])
def process_image():
    try:
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000) 