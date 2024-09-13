'use client'

import type { FC, JSX, PropsWithChildren } from 'react'
import * as React from 'react'

// 平铺式 provider，避免 provider 嵌套地狱
export const ProviderComposer: FC<
  {
    contexts: JSX.Element[]
  } & PropsWithChildren
> = ({ contexts, children }) =>
  contexts.reduceRight(
    (kids: any, parent: any) => React.cloneElement(parent, { children: kids }),
    children,
  )
