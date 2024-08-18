import { createClient } from '@egoist/tipc/renderer'
import type { Router } from '@main/tipc'

export const tipcClient = createClient<Router>({
  ipcInvoke: window.electron.ipcRenderer.invoke,
})
