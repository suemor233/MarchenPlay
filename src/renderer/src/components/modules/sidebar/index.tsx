import { PROJECT_NAME } from '@renderer/constants'
import { cn } from '@renderer/libs/utils'
import type { SidebarRouteObject } from '@renderer/router'
import { RouteName, siderbarRoutes } from '@renderer/router'
import type { FC } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { DarkModeToggle } from './DarkMode'

export const Sidebar = () => {
  const normalStyle = !window.electron || window.electron.process.platform !== 'darwin'
  return (
    <div className="relative flex h-full w-[250px] flex-col justify-between bg-base-200 px-3 pt-2.5">
      <div>
        <div className={cn('drag-region flex items-center', 'ml-2 cursor-pointer justify-between')}>
          <Link to={RouteName.PLAYER} draggable={false} className="font-logo">
            {normalStyle && PROJECT_NAME}
          </Link>
          <button
            type="button"
            onClick={() => {
              toast.warning('还在编写中，敬请期待')
            }}
            className="no-drag-region flex size-8 items-center justify-center rounded-md transition-colors hover:bg-base-300"
          >
            <i className="icon-[mingcute--user-add-2-line]" />
          </button>
        </div>
        <nav className="mt-5 flex flex-col gap-2">
          {siderbarRoutes.map((route) => (
            <NavLinkItem {...route} key={route.path} />
          ))}
        </nav>
      </div>

      <DarkModeToggle />
    </div>
  )
}

const NavLinkItem: FC<SidebarRouteObject> = ({ path, meta }) => {
  const { pathname } = useLocation()
  if (!meta || !path) {
    return null
  }
  const { title, icon } = meta
  return (
    <NavLink
      draggable={false}
      to={path}
      className={cn(pathname === path && 'rounded-md bg-base-300')}
    >
      <p className="flex items-center gap-1 p-2">
        <i className={icon} />
        <span>{title}</span>
      </p>
    </NavLink>
  )
}
