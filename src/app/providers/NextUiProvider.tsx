'use client'

import { NextUIProvider } from '@nextui-org/react'

export default function NextUiProvider({ children }: React.PropsWithChildren) {
  return (
    <NextUIProvider>
        {children}
    </NextUIProvider>
  )
}
