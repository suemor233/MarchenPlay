import { appRoute } from './app'
import { settingRoute } from './setting'

export const router = {
  ...settingRoute,
  ...appRoute,
}

export type Router = typeof router
