'use strict'

import { app, protocol, BrowserWindow,Menu,ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
 import { autoUpdater } from "electron-updater"
const path = require('path')
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
 const logger = require('electron-log');
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
let win 
async function createWindow() {
  // Create the browser window.
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      // contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    }
  }) 

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
   process.env.GH_TOKEN ="92244059e65155d70d21d35290bc383e2f703b7e";

    autoUpdater.checkForUpdatesAndNotify()
  }
  // process.env.GH_TOKEN ="fd162d15a2d9b0c2a859c4efcacd1fc763547353";

  // mainWindow.once('ready-to-show', () => {w
  //   autoUpdater.checkForUpdatesAndNotify();
  // });
//    autoUpdater.autoDownload = false;
//  /* Check for updates manually */
//  autoUpdater.checkForUpdates();

//  /* Check updates every 10 minutes */
//  setInterval(() => {
//    autoUpdater.checkForUpdates();
//  }, 10 * 60 * 1000);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
const template =[
  {
   
    role:'reload'
  }
]
const myAppMenu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(myAppMenu)
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

autoUpdater.on('checking-for-update', () => {
  logger.log('Checking for update');
});
autoUpdater.on('error', (error) => {
  logger.error('Error while checking for updates', error);
});
autoUpdater.on("update-available", (E) => {
  logger.log('Update is available:', E);
  win.webContents.send("update_available", "update_available");
});
autoUpdater.on("update-not-available", () => {
  
  win.webContents.send("updater", "update_not_available");
});
autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
