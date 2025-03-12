/* eslint-disable no-undef */
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const pdfLib = require("pdf-lib");
const pdfParse = require("pdf-parse");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:5173");
});

ipcMain.handle("open-file-dialog", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [{ name: "PDF Files", extensions: ["pdf"] }],
  });
  return result.filePaths[0] || "";
});

ipcMain.handle("open-folder-dialog", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  return result.filePaths[0] || "";
});

ipcMain.handle("process-pdf", async (event, inputPath, outputPath) => {
  try {
    if (!inputPath || !outputPath) {
      throw new Error("Caminho de entrada ou saída inválido.");
    }

    // 🔹 Lê o PDF original
    const pdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();

    let nomesExtraidos = new Set(); // Para armazenar nomes únicos e evitar duplicação

    // 🔹 Processa cada página separadamente
    for (let i = 0; i < totalPages; i++) {
      // 🔹 Extrai o texto da página atual
      const singlePageDoc = await pdfLib.PDFDocument.create();
      const [copiedPage] = await singlePageDoc.copyPages(pdfDoc, [i]);
      singlePageDoc.addPage(copiedPage);
      const singlePageBytes = await singlePageDoc.save();
      const pageText = await pdfParse(singlePageBytes);

      // 🔹 Expressão regular para capturar o nome do beneficiário
      let regexNome =
        /CPF\s*Nome Completo\s*\n?\d{3}\.\d{3}\.\d{3}-\d{2}\s*([\w\sÁÉÍÓÚÃÕÂÊÎÔÛÇáéíóúãõâêîôûç-]+)/;

      let match = regexNome.exec(pageText.text);
      let nomeCompleto = match ? match[1].trim() : `Beneficiario_Desconhecido`;

      // 🔹 Remove textos extras e caracteres inválidos do nome
      nomeCompleto = nomeCompleto
        .replace(/\s+/g, "_")
        .replace(/[<>:"/\\|?*]/g, "");

      // 🔹 Verifica se o nome já foi salvo para evitar duplicação
      if (nomesExtraidos.has(nomeCompleto)) {
        nomeCompleto += `_${i + 1}`;
      }
      nomesExtraidos.add(nomeCompleto);

      // 🔹 Salva cada página separadamente com o nome correto
      const fileName = `${nomeCompleto}.pdf`;
      fs.writeFileSync(path.join(outputPath, fileName), singlePageBytes);
    }

    return `✅ PDFs gerados com sucesso em: ${outputPath}`;
  } catch (error) {
    console.error("Erro ao processar PDF:", error);
    return "❌ Erro ao processar PDF.";
  }
});
