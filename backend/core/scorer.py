import re

# We simplified some names (like 'node.js' to 'node') to catch more matches
REQUIRED_SKILLS = {
    "python", "react", "node", "sql", "machine learning", 
    "docker", "aws", "git", "html", "css", "javascript", "api",
    "java", "c++", "linux"
}

def analyze_skills(text):
    # 1. Aggressively clean the text: replace newlines and weird spacing with single spaces
    clean_text = re.sub(r'\s+', ' ', text.lower())
    
    # DEBUG: This will print the first 500 characters to your terminal 
    # so you can actually see what the Python sees!
    print("--- EXTRACTED TEXT PREVIEW ---")
    print(clean_text[:500])
    print("------------------------------")
    
    found_skills = set()
    
    for skill in REQUIRED_SKILLS:
        # 2. More forgiving regex: looks for the skill with word boundaries, 
        # but handles punctuation better.
        pattern = r'(?<![a-z])' + re.escape(skill) + r'(?![a-z])'
        if re.search(pattern, clean_text):
            found_skills.add(skill)

    matched_list = list(found_skills)
    missing_list = list(REQUIRED_SKILLS - found_skills)
    
    # Calculate score safely
    if len(REQUIRED_SKILLS) == 0:
        score = 0
    else:
        score = int((len(matched_list) / len(REQUIRED_SKILLS)) * 100)
    
    return {
        "score": score,
        "matched": matched_list,
        "missing": missing_list
    }