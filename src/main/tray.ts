import { Menu, Tray, app } from 'electron'

// @ts-ignore
import icon from '../../resources/rotionTemplate.png?asset'

app.whenReady().then(() => {
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    { type: 'checkbox', label: 'Ativar modo dark' },
    { label: 'Rotion' },
    { label: 'Rotion' },
  ])

  tray.setContextMenu(menu)
})
