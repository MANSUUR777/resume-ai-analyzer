from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import io

app = Flask(__name__)

# IMPORTANT: Ensure this matches your Vercel URL
CORS(app, resources={r"/api/*": {"origins": ["https://resume-ai-analyzer-delta.vercel.app"]}})

CORE_SKILLS = ["Data Structures", "Database", "Communication Skills"]

@app.route('/api/analyze', methods=['POST'])
def analyze_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    text = ""
    
    try:
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

    # Programming Language Logic
    has_language = False
    if "python" in text_lower:
        matched.append("Python")
        has_language = True
    if "java" in text_lower:
        matched.append("Java")
        has_language = True
    
    if has_language:
        points += 1
    else:
        missing.append("Java / Python")

    # Core Skills Logic
    for skill in CORE_SKILLS:
        if skill.lower() in text_lower:
            matched.append(skill)
            points += 1
        else:
            missing.append(skill)

    score = int((points / 4) * 100)
    
    return jsonify({
        "score": score,
        "matched": matched,
        "missing": missing
    })

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
