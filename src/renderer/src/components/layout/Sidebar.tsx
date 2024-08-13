import { cn } from '@renderer/libs/utils'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  const normalStyle =
    !window.electron || window.electron.process.platform !== 'darwin'
  return (
    <div className="relative h-full w-[250px] bg-base-200 pt-2.5">
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
        <NavLink to="/">back</NavLink>
        <NavLink to="/contacts/1">home</NavLink>
      </div>
    </div>
  )
}
