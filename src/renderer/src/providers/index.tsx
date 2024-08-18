import queryClient from '@renderer/libs/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'

import { ProviderComposer } from './ProviderComposer'

const contexts: JSX.Element[] = [

  <QueryClientProvider client={queryClient} key="QueryClientProvider" />,
]
export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <ProviderComposer contexts={contexts}>
    {children}
  </ProviderComposer>
)
