import { appRoute } from './app'
import { playerRoute } from './player'
import { settingRoute } from './setting'

export const router = {
  ...settingRoute,
  ...appRoute,
  ...playerRoute,
}

export type Router = typeof router
