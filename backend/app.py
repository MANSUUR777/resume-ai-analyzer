from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import io

app = Flask(__name__)

# Security: Allows your Vercel frontend to talk to this backend
CORS(app, resources={r"/api/*": {"origins": ["https://resume-ai-analyzer-delta.vercel.app"]}})

# Simplified skill list (3 Core + 1 Language)
CORE_SKILLS = ["Data Structures", "Database", "Communication Skills"]

@app.route('/api/analyze', methods=['POST'])
def analyze_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    text = ""
    
    try:
        # Read PDF content
        with pdfplumber.open(io.BytesIO(file.read())) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
    except Exception as e:
        return jsonify({"error": "Could not read PDF file"}), 500
    
    text_lower = text.lower()
    matched = []
    missing = []
    points = 0

    # 1. Programming Language Logic (Java OR Python = 1 Point)
    has_lang = False
    if "python" in text_lower:
        matched.append("Python")
        has_lang = True
    if "java" in text_lower:
        matched.append("Java")
        has_lang = True
    
    if has_lang:
        points += 1
    else:
        missing.append("Java / Python")

    # 2. Core Skills Logic (Each = 1 Point)
    for skill in CORE_SKILLS:
        if skill.lower() in text_lower:
            matched.append(skill)
            points += 1
        else:
            missing.append(skill)

    # Score calculation (Total 4 points)
    # 4/4 = 100%, 3/4 = 75%, 2/4 = 50%, 1/4 = 25%
    score = int((points / 4) * 100)
    
    return jsonify({
        "score": score,
        "matched": matched,
        "missing": missing
    })

if __name__ == '__main__':
    # Required settings for Render deployment
    app.run(debug=False, host='0.0.0.0', port=5000)
