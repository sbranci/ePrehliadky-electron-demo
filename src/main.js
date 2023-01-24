const { app, dialog, BrowserWindow, ipcMain, Notification  } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

log.transports.file.resolvePath = () => path.join('C:/development/ePrehliadky/ePrehliadky-electron-demo/', '/logs/main.log');

let mainWindow;
const NOTIFICATION_TITLE = 'Update Notification'
const NOTIFICATION_BODY = 'A new version is being downloaded.'

function createWindow() {
  // Create the browser window.
  mainWindow  = new BrowserWindow({
    width: 1000, 
    height: 1000,
    webPreferences: {
      contextIsolation: true, // this is the default in Electron >= 12. Must be true for the context bridge API to work.
      nodeIntegration: false, // this is the default in Electron >= 5
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('show', () => {
    setTimeout(() => {
      win.focus();
    }, 200);
  });

  log.log("-----------------------------------------");
  log.log("Application version = " + app.getVersion());
  
  autoUpdater.checkForUpdates()
}

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.on("ready", () => {
  createWindow();
})
// app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

// Handle form "submission" by printing out the name passed via IPC to the Node.js console,
// and then sending back an IPC message indicating that it was successful.
// ipcMain.on('print-name', (event, name) => {
//   console.log(`Name passed from the renderer: ${name}`)
//   event.reply('name-status', 'Printed name to the Node.js console!')
// })

ipcMain.handle('getAppVersion', () => {
  return app.getVersion();
});



// ------------ AUTO-UPDATER SECTION ------------

autoUpdater.on("checking-for-update", () => {
  log.info("Checking for update...");
})

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Ok'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version is being downloaded.'
	}
  log.info("Update available.");
  showNotification();
	dialog.showMessageBox(dialogOpts, (response) => {

  });
})

autoUpdater.on("update-not-available", (info) => {
  log.info("Update not available.");
})

// autoUpdater.on("error", (err) => {
//   log.info("Error in auto-update. " + err);
// })

// autoUpdater.on("download-progress", (progressTrack) => {
//   log.info("Download progress...");
// })

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version has been downloaded. Restart the application to apply the updates.'
	};
  log.info("Update downloaded.");
	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall()
	})
});