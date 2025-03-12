from flask import Flask, request, jsonify
import os
import re
import pdfplumber
from PyPDF2 import PdfReader, PdfWriter
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


regex_nome = re.compile(r"CPF\s+Nome Completo\s*\n?\d{3}\.\d{3}\.\d{3}-\d{2}\s+([A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ][A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇa-záéíóúãõâêîôûç]+\s+[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇa-záéíóúãõâêîôûç]+(?:\s+[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇa-záéíóúãõâêîôûç]+)*)")


@app.route("/")
def home():
    return jsonify({"message": "Servidor Flask rodando! Use /process-pdf para processar arquivos."})

@app.route("/process-pdf", methods=["POST"])
def process_pdf():
    data = request.json
    input_pdf_path = data.get("input_path")
    output_folder = data.get("output_path")

    if not os.path.exists(input_pdf_path):
        return jsonify({"message": "Arquivo PDF de entrada não encontrado!"}), 400

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    with pdfplumber.open(input_pdf_path) as pdf:
        reader = PdfReader(input_pdf_path)

        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            match = regex_nome.search(text)
            nome_arquivo = f"pagina_{i+1}.pdf"

            if match:
                nome_completo = match.group(1).strip()
                nome_arquivo = f"{nome_completo.replace(' ', '_')}.pdf"

            output_path = os.path.join(output_folder, nome_arquivo)
            writer = PdfWriter()
            writer.add_page(reader.pages[i])

            with open(output_path, "wb") as output_pdf:
                writer.write(output_pdf)

    return jsonify({"message": "Processamento concluído com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
