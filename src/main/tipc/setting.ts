import { BrowserWindow } from 'electron'

import { t } from './_instance'

export const settingRoute = {
  getWindowIsMaximized: t.procedure.action(async ({ context }) => {
    const webContents = context.sender
    return BrowserWindow.fromWebContents(webContents)?.isMaximized()
  }),
}
