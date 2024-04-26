import type React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { shadesOfPurple } from '@clerk/themes'
import ClientProviders from '@/app/providers/ClientProviders'

export default function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider appearance={{ baseTheme: shadesOfPurple }}>
      <ClientProviders>{children}</ClientProviders>
    </ClerkProvider>
  )
}
