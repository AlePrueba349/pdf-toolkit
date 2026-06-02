# core/split.py
from pypdf import PdfReader, PdfWriter

def split_pdf(file_path: str, output_folder: str):
    """
    Divide un PDF en páginas individuales.
    """
    reader = PdfReader(file_path)

    output_files = []

    for i, page in enumerate(reader.pages):
        writer = PdfWriter()
        writer.add_page(page)

        output_path = f"{output_folder}/page_{i+1}.pdf"

        with open(output_path, "wb") as f:
            writer.write(f)

        output_files.append(output_path)

    return output_files