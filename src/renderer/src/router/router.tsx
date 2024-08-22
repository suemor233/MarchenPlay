import App from '@renderer/App'
import NotFound from '@renderer/components/common/NotFound'
import { RootLoader } from '@renderer/libs/loading'
import VideoPlayer from '@renderer/page/video'
import type { NonIndexRouteObject, RouteObject } from 'react-router-dom'
import { createHashRouter, Navigate } from 'react-router-dom'

import { RouteName } from '.'

export interface SidebarRouteObject extends NonIndexRouteObject {
  meta?: {
    icon: string
    title: string
  }
}

export const siderbarRoutes = [
  {
    path: RouteName.PLAYER,
    meta: {
      icon: 'icon-[mingcute--video-camera-line]',
      title: '视频播放',
    },
    element: <VideoPlayer />,
  },
  {
    path: RouteName.LATEST_ANIME,
    meta: {
      icon: 'icon-[mingcute--lightning-line]',
      title: '最新番剧',
    },
    element: <VideoPlayer />,
  },
  {
    path: RouteName.HISTORY,
    meta: {
      icon: 'icon-[mingcute--history-line]',
      title: '播放记录',
    },
    element: <VideoPlayer />,
  },
] satisfies SidebarRouteObject[]

export const router = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    loader: RootLoader,
    children: [{
      path: '/',
      element: <Navigate to={RouteName.PLAYER} replace />,
    }, ...siderbarRoutes],
  },
] satisfies RouteObject[]

export const reactRouter = createHashRouter(router)
