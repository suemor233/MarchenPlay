import type { BrowserWindow } from 'electron'

import { t } from './_instance'

export const settingRoute = {
  getWindowIsMaximized: t.procedure.input<void>().action(async ({ context }) => {
    // const webContents = context.sender
    // console.log('111111111111111', BrowserWindow.fromWebContents(webContents)?.isMaximized())
    // return BrowserWindow.fromWebContents(webContents)?.isMaximized()
    const window: BrowserWindow | null = (
      context.sender as Sender
    ).getOwnerBrowserWindow()
    // eslint-disable-next-line no-console
    console.log(window?.isMaximized(), '111111111')
    return window?.isMaximized()
  }),
}
interface Sender extends Electron.WebContents {
  getOwnerBrowserWindow: () => Electron.BrowserWindow | null
}
