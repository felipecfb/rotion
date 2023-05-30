import { app, shell, BrowserWindow } from 'electron'
import path from 'node:path'
import { createFileRoute, createURLRoute } from 'electron-router-dom'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// @ts-ignore
import icon from '../../resources/icon.png?asset'

import './ipc'
import './store'
import { createTray } from './tray'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1120,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#17141f',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#17141f',
      symbolColor: '#ebeaed',
      height: 35,
    },
    ...(process.platform === 'win32' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  createTray(mainWindow)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const devServerURL = createURLRoute(
    process.env.ELECTRON_RENDERER_URL!,
    'main',
  )

  const fileRoute = createFileRoute(
    path.join(__dirname, '../renderer/index.html'),
    'main',
  )

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(...fileRoute)
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
