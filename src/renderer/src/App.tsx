import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { RootLayout } from './components/layout/RootLayout'
import { Sidebar } from './components/layout/Sidebar'
import { Titlebar } from './components/modules/windows/Titlebar'
import { appLog } from './libs/log'
import { RootProviders } from './providers'

function App(): JSX.Element {
  return (
    <RootProviders>
      <Prepare />

      <RootLayout>
        <Sidebar />
        <Content />
      </RootLayout>
    </RootProviders>
  )
}

const Prepare = () => {
  useEffect(() => {
    const doneTime = Math.trunc(performance.now())

    appLog('App is ready', `${doneTime}ms`)
  }, [])
  // const windowsElectron = window.electron && getOS() === 'Windows'
  return (
    (
      <div>
        <Titlebar />
      </div>
    )
  )
}

const Content = () => (
  <main className="flex-1">
    <Outlet />
  </main>
)
export default App
