import { cn } from '@renderer/libs/utils'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  const normalStyle =
    !window.electron || window.electron.process.platform !== 'darwin'
  return (
    <div className="h-full w-[250px] bg-base-200">
      <div className={cn(
        'ml-5 mr-3 flex items-center',

        normalStyle ? 'ml-4 justify-between' : 'justify-end',
      )}
      >
        <button className="btn btn-primary">One</button>
      </div>
      <button className="btn btn-secondary">Two</button>
      <button className="btn btn-outline btn-accent">Three</button>
      <NavLink to="/">back</NavLink>
      <NavLink to="/contacts/1">home</NavLink>
    </div>
  )
}
