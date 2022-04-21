// Modules to control application life and create native browser window
//const {app, BrowserWindow} = require('electron')
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

// 상단 메뉴 없애기
Menu.setApplicationMenu(false)

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1680,
    height: 1050,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      //nodeIntegrationInWorker: true,
      enableRemoteModule: true, // 리모트 모듈 사용 
      preload: path.join(__dirname, 'preload.js') 
      ,webviewTag : true  // 웹뷰 테그를 사용할 수 있도록 허용
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools. # 개발자모드 열기 - 자체창 사이드
  mainWindow.webContents.openDevTools()

  // 변수를 공유해보자
  const {ipcMain} = require('electron');
  ipcMain.on('getGlobalVal', (event, arg) => {
    // index.json 파일있는경우 로드
    var fs = require('fs')
    var jsonData={};
    if(fs.existsSync('./index.json')){
      jsonData = require('./index.json')
    }
    mainWindow.webContents.send('setGlobalVal', jsonData);
});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// If development environment
// 개발환경인 경우 리로드실행
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    , hardResetMethod: 'exit'
  });
}
