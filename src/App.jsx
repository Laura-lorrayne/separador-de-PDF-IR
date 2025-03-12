import { useState, useEffect } from "react";

function App() {
  const [inputPath, setInputPath] = useState("");
  const [outputPath, setOutputPath] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!window.electron) {
      console.error("⚠️ Electron não está disponível no contexto do frontend.");
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
    console.log("📄 Processando PDF...");

    if (!window.electron) {
      console.error("⚠️ Electron não está disponível.");
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
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        {/* Título */}
        <h1 className="text-3xl font-extrabold mb-6 flex items-center justify-center">
          🔹 Separador de PDF de Imposto de renda
        </h1>

        {/* Entrada do PDF */}
        <div className="w-full mb-5">
          <label className="block text-lg font-semibold mb-2 text-left">📂 PDF de Entrada:</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Selecione um arquivo..."
              value={inputPath}
              readOnly
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            />
            <button
              onClick={handleSelectFile}
              className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200"
            >
              📁
            </button>
          </div>
        </div>

        {/* Pasta de Destino */}
        <div className="w-full mb-5">
          <label className="block text-lg font-semibold mb-2 text-left">📁 Pasta de Destino:</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Selecione uma pasta..."
              value={outputPath}
              readOnly
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            />
            <button
              onClick={handleSelectFolder}
              className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200"
            >
              📂
            </button>
          </div>
        </div>

        {/* Botão de Processar */}
        <button
          onClick={handleProcessPDF}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          🚀 Processar PDF
        </button>

        {/* Status */}
        {status && (
          <div className="mt-4 text-center text-yellow-400 font-medium text-sm">{status}</div>
        )}
      </div>
    </div>
  );
}

export default App;
