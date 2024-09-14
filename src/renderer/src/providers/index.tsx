import { jotaiStore } from '@renderer/atoms/store'
import { SettingDialog } from '@renderer/components/modules/setting'
import queryClient from '@renderer/libs/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from 'next-themes-suemor'
import type { FC, PropsWithChildren } from 'react'

import { ProviderComposer } from './ProviderComposer'
import { ToastContainer } from './ToastContainer'

const contexts: JSX.Element[] = [
  <QueryClientProvider client={queryClient} key="QueryClientProvider" />,
  <JotaiProvider store={jotaiStore} key="jotaiProvider" />,
  // @ts-ignore
  <ThemeProvider
    key="ThemeProvider"
    attribute={['data-theme', 'class']}
    themes={['cmyk', 'dark']}
  />,
]
export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <ProviderComposer contexts={contexts}>
    {children}

    <ToastContainer />
    <SettingDialog />
  </ProviderComposer>
)
