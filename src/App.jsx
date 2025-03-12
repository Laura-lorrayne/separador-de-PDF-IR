import { useState, useEffect } from "react";

function App() {
  const [inputPath, setInputPath] = useState("");
  const [outputPath, setOutputPath] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!window.electron) {
      console.error("⚠️ Electron não está disponível no contexto do frontend.");
      setStatus("⚠️ Electron não está disponível.");
    } else {
      console.log("✅ Electron carregado corretamente!");
    }
  }, []);

  const handleSelectFile = async () => {
    if (!window.electron || !window.electron.openFileDialog) {
      setStatus("⚠️ Electron não está disponível.");
      return;
    }
    const filePath = await window.electron.openFileDialog();
    if (filePath) setInputPath(filePath);
  };

  const handleSelectFolder = async () => {
    if (!window.electron || !window.electron.openFolderDialog) {
      setStatus("⚠️ Electron não está disponível.");
      return;
    }
    const folderPath = await window.electron.openFolderDialog();
    if (folderPath) setOutputPath(folderPath);
  };

  const handleProcessPDF = async () => {
    if (!window.electron) {
      setStatus("⚠️ Electron não está disponível.");
      return;
    }

    if (!inputPath || !outputPath) {
      alert("⚠️ Selecione um arquivo e uma pasta de destino.");
      return;
    }

    try {
      const result = await window.electron.processPDF(inputPath, outputPath);
      alert(result);
    } catch (error) {
      console.error("Erro ao processar PDF:", error);
      alert("❌ Erro ao processar o PDF.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="container bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center justify-center">
          Separador de PDF de Imposto de Renda
        </h1>

        <p className="text-gray-300 text-sm text-center mb-6">
          Selecione um <strong>PDF de Imposto de Renda</strong> e uma pasta de
          destino para salvar os arquivos separados.
        </p>

        <div className="w-full mb-5">
          <label className="block text-lg font-semibold mb-2 text-left text-gray-200 flex items-center">
            📂 PDF de Entrada:
          </label>
          <div className="input-container">
            <input
              type="text"
              placeholder="Selecione um arquivo..."
              value={inputPath}
              readOnly
              className="flex-grow p-3 bg-gray-700 text-white border-none text-center"
            />
            <button
              onClick={handleSelectFile}
              className="p-3 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              📁
            </button>
          </div>
        </div>

        <div className="w-full mb-5">
          <label className="block text-lg font-semibold mb-2 text-left text-gray-200 flex items-center">
            📁 Pasta de Destino:
          </label>
          <div className="input-container">
            <input
              type="text"
              placeholder="Selecione uma pasta..."
              value={outputPath}
              readOnly
              className="flex-grow p-3 bg-gray-700 text-white border-none text-center"
            />
            <button
              onClick={handleSelectFolder}
              className="p-3 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              📂
            </button>
          </div>
        </div>

        <button
          onClick={handleProcessPDF}
          className="processar-pdf-btn w-full text-white p-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>🚀</span> Processar PDF
        </button>

        {status && (
          <div className="mt-4 text-center text-yellow-400 font-medium text-sm">
            {status}s
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
