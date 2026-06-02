# core/merge.py
from pypdf import PdfMerger
from typing import List

def merge_pdfs(files: List[str], output_path: str) -> str:
    """
    Une múltiples PDFs en uno solo.
    
    Args:
        files: lista de rutas de PDFs
        output_path: archivo final
    
    Returns:
        ruta del archivo generado
    """
    merger = PdfMerger()

    for file in files:
        merger.append(file)

    merger.write(output_path)
    merger.close()

    return output_path