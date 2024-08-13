import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'

import { RootLayout } from './components/layout/RootLayout'
import { Sidebar } from './components/layout/Sidebar'
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

  return null
}

const Content: FC<PropsWithChildren> = ({ children }) => (
  <main className="flex-1">
    {children}
  </main>
)
export default App
