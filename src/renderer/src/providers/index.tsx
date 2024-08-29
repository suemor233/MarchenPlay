import { jotaiStore } from '@renderer/atoms/store'
import queryClient from '@renderer/libs/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import type { FC, PropsWithChildren } from 'react'

import { ProviderComposer } from './ProviderComposer'

const contexts: JSX.Element[] = [
  <QueryClientProvider client={queryClient} key="QueryClientProvider" />,
  <JotaiProvider store={jotaiStore} key="jotaiProvider" />,
  // @ts-ignore
  <ThemeProvider key="ThemeProvider" attribute="data-theme" themes={['cmyk', 'dark']} />,
]
export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <ProviderComposer contexts={contexts}>
    {children}
  </ProviderComposer>
)
