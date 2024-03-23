'use client'

import { ConvexProviderWithClerk } from 'convex/react-clerk'
import type React from 'react'
import { ThemeProvider } from 'next-themes'
import { ConvexReactClient } from 'convex/react'
import { useAuth } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import AppToaster from '@/app/hs/components/ui/AppToaster'

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
)

export default function ClientProviders({ children }: React.PropsWithChildren) {
  const router = useRouter()
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <NextUIProvider navigate={router.push}>
          <AppToaster />
          {children}
        </NextUIProvider>
      </ThemeProvider>
    </ConvexProviderWithClerk>
  )
}
