# core/compress.py
import fitz  # PyMuPDF

def compress_pdf(input_path: str, output_path: str):
    doc = fitz.open(input_path)

    doc.save(
        output_path,
        garbage=4,     # limpia objetos innecesarios
        deflate=True,  # compresión
        clean=True
    )

    doc.close()
    return output_path