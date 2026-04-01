import pdfplumber

def extract_text_from_pdf(file_stream):
    """Extracts all text from a PDF file stream."""
    text = ""
    try:
        with pdfplumber.open(file_stream) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        return text.strip()
    except Exception as e:
        raise ValueError(f"Could not parse PDF: {str(e)}")