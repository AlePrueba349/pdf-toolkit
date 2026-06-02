# core/rotate.py
from pypdf import PdfReader, PdfWriter

def rotate_pdf(file_path: str, output_path: str, angle: int = 90):
    reader = PdfReader(file_path)
    writer = PdfWriter()

    for page in reader.pages:
        page.rotate(angle)
        writer.add_page(page)

    with open(output_path, "wb") as f:
        writer.write(f)

    return output_path