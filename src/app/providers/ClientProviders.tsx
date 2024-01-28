'use client'

import { ConvexProviderWithClerk } from 'convex/react-clerk'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { ConvexReactClient } from 'convex/react'
import { useAuth } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
)

export default function ClientProviders({ children }: React.PropsWithChildren) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
    </ConvexProviderWithClerk>
  )
}
