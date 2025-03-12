/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openFileDialog: () => ipcRenderer.invoke("open-file-dialog"),
  openFolderDialog: () => ipcRenderer.invoke("open-folder-dialog"),
  processPDF: (inputPath, outputPath) =>
    ipcRenderer.invoke("process-pdf", inputPath, outputPath),
});
