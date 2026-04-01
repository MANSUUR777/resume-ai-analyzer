from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from core.parser import extract_text_from_pdf
from core.scorer import analyze_skills

app = Flask(__name__)
CORS(app)

MAX_FILE_SIZE = 1 * 1024 * 1024  # 1 MB

@app.route('/api/analyze', methods=['POST'])
def analyze_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Only PDF files are allowed"}), 400

    # Size check
    file.seek(0, os.SEEK_END)
    if file.tell() > MAX_FILE_SIZE:
        return jsonify({"error": "File exceeds 1MB limit. Teddy is struggling!"}), 400
    file.seek(0) # Reset pointer

    try:
        text = extract_text_from_pdf(file)
        
        if not text:
            return jsonify({"error": "No readable text found. Please upload a text-based PDF."}), 400

        results = analyze_skills(text)
        return jsonify(results), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred processing the file."}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port)