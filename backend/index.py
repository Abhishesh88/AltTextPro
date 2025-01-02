from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/api/process-image', methods=['POST'])
def process_image():
    return jsonify({"status": "ok"})

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"status": "working"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True) 