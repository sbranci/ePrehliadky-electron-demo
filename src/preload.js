
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension, so you can't
// modify the `window` global without using the context bridge.
// Please note that you can still access the `window` global and,
// for example, add event listeners or update DOM elements.

const { contextBridge, ipcRenderer } = require('electron')

// Set up context bridge between the renderer process and the main process
// contextBridge.exposeInMainWorld(
//   'myAPI', // This is just an arbitrary name of the window property you're creating.
//            // It should be meaningful to your app.
//   {
//     // You can call this in the renderer like so:
//     // window.myAPI.printNameToCLI(myName)
//     printNameToCLI: (name) => ipcRenderer.send('print-name', name)
//   }
// )

contextBridge.exposeInMainWorld('bridge', {
  getAppVersion: () => ipcRenderer.invoke('getAppVersion')
})

// Handle the IPC message sent from the main process after it prints the
// name to the console by showing a status banner at the top
// ipcRenderer.on('name-status', (event, message) => {
//   const statusBanner = document.getElementById('status-banner')
//   statusBanner.innerText = `Message from the main process: ${message}`

//   // Do a fancy fade out of the status banner
//   statusBanner.style.transition = 'opacity 3s ease-in';
//   statusBanner.classList.add('hidden')
//   statusBanner.addEventListener('transitionend', () => {
//     // reset the status banner for the next form submission
//     statusBanner.innerText = ''
//     statusBanner.style.transition = ''
//     statusBanner.classList.remove('hidden')
//   })
// })