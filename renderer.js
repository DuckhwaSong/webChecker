// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

/*
const {ipcRenderer} = require('electron');
ipcRenderer.send('getGlobalVal',{"123":"123"});
ipcRenderer.on('setGlobalVal', (event, message) => {
    //ipcRenderer.send('EventB', {someotherData});
    console.log(message)
});*/