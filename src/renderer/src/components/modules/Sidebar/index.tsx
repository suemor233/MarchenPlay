import { cn } from '@renderer/libs/utils'
import type { SidebarRouteObject } from '@renderer/router'
import { siderbarRoutes } from '@renderer/router'
import type { FC } from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  const normalStyle =
    !window.electron || window.electron.process.platform !== 'darwin'
  return (
    <nav className="relative h-full w-[250px] bg-base-200 pt-2.5">
      <div className={cn(
        'drag-region ml-5 mr-3 flex items-center',
        normalStyle ? 'ml-4 justify-between' : 'justify-end',
      )}
      >
        <button type="button" className="no-drag-region flex size-8 items-center justify-center rounded-md transition-colors hover:bg-base-300">
          <i className="icon-[mingcute--user-add-2-line]" />
        </button>
      </div>
      <div className="flex flex-col">
        {siderbarRoutes.map((route) => (
          <NavLinkItem {...route} key={route.path} />
        ))}

      </div>
    </nav>
  )
}

const NavLinkItem: FC<SidebarRouteObject> = ({ path, meta }) => {
  if (!meta || !path) {
    return null
  }
  const { title, icon } = meta
  return (
    <NavLink to={path}>
      <p>
        <span>{title}</span>
        <i className={icon} />
      </p>
    </NavLink>
  )
}
