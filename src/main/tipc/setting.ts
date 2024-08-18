import { BrowserWindow } from 'electron'

import { t } from './_instance'

export const settingRoute = {
  getWindowIsMaximized: t.procedure.action(async ({ context }) => {
    const webContents = context.sender
    // console.log('111111111111111', BrowserWindow.fromWebContents(webContents)?.isMaximized())
    return BrowserWindow.fromWebContents(webContents)?.isMaximized()
  }),
}
