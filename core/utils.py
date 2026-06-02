# core/utils.py
import os
import uuid

def generate_temp_filename(extension="pdf"):
    return f"/tmp/{uuid.uuid4()}.{extension}"