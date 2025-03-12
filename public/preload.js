/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openFileDialog: async () => ipcRenderer.invoke("open-file-dialog"),
  openFolderDialog: async () => ipcRenderer.invoke("open-folder-dialog"),
  processPDF: async (inputPath, outputPath) => ipcRenderer.invoke("process-pdf", inputPath, outputPath),
});


