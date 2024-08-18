import { registerIpcMain } from '@egoist/tipc/main'

import { router } from './tipc'

export const register = () => {
  registerIpcMain(router)
}
