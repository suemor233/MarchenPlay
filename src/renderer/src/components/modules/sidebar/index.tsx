import { cn } from '@renderer/libs/utils'
import type { SidebarRouteObject } from '@renderer/router'
import { siderbarRoutes } from '@renderer/router'
import type { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { DarkModeToggle } from './DarkMode'

export const Sidebar = () => {
  const normalStyle =
    !window.electron || window.electron.process.platform !== 'darwin'
  return (
    <div className="relative h-full w-[250px] bg-base-200 px-3 pt-2.5">
      <div className={cn(
        'drag-region ml-5 flex items-center',
        normalStyle ? 'ml-4 justify-between' : 'justify-end',
      )}
      >
        <button type="button" className="no-drag-region flex size-8 items-center justify-center rounded-md transition-colors hover:bg-base-300">
          <i className="icon-[mingcute--user-add-2-line]" />
        </button>
      </div>
      <nav className="mt-5 flex flex-col gap-2">
        {siderbarRoutes.map((route) => (
          <NavLinkItem {...route} key={route.path} />
        ))}
      </nav>

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
    <NavLink to={path} className={cn(pathname === path && 'rounded-md bg-base-300')}>
      <p className="flex items-center gap-1 p-2">
        <i className={icon} />
        <span>{title}</span>
      </p>
    </NavLink>
  )
}
