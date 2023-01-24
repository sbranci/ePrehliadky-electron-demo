const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('bridge', {
  getAppVersion: () => ipcRenderer.invoke('getAppVersion')
})