const { app, BrowserWindow } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

log.transports.file.resolvePath = () => path.join('C:/development/ePrehliadky/ePrehliadky-electron-demo/', '/logs/main.log');
log.log("Application version = " + app.getVersion())

let win;

function createWindow() {
  win = new BrowserWindow({width:300, height:400})

  win.loadFile(path.join(__dirname, 'index.html'))
}

autoUpdater.on("checking-for-update", () => {
  log.info("Checking for update...");
})

autoUpdater.on("update-available", (info) => {
  log.info("Update available.");
})

autoUpdater.on("update-not-available", (info) => {
  log.info("Update not available.");
})

autoUpdater.on("error", (err) => {
  log.info("Error in auto-update. " + err);
})

autoUpdater.on("download-progress", (progressTrack) => {
  log.info("Download progress");
  log.info(progressTrack);
})

autoUpdater.on("update-downloaded", (info) => {
  log.info("Update downloaded.");
})

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})