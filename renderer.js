// This file is required by the index.html file and will
// be executed in the renderer process for that window.
//
// All APIs exposed by the context bridge are available here.

// Add event handler when the name form is submitted
// document.getElementById('name-form').addEventListener('submit', (event) => {
//   // Prevent the form from actually being "submitted", as that will effectively reload the page.
//   event.preventDefault()

//   // event.target refers to the <form> element that's attached to the submit event.
//   const form = event.target

//   // Send the value of the text input box to the main process via the context bridge API
//   // defined in the preload script.
//   window.myAPI.printNameToCLI(form.yourName.value)
// })

function getAppVersion() {
  settings = window.bridge.getAppVersion().then(appVersion => {
      document.getElementById('version').innerText = 'Version ' + appVersion;
  })
}

getAppVersion()