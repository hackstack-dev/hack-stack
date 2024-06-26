import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import AppProviders from '@/app/providers/AppProviders'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HackStack',
  description:
    'Uncover, Share, Plan and unlock the Collective Genius: HackStack is Your Tech Stack Hub'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="text-foreground bg-background"
      suppressHydrationWarning
    >
      <body className={font.className}>
        <NextTopLoader showSpinner={false} color="#d946ef" />

        <AppProviders>{children}</AppProviders>
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="884524f0-0079-4ff6-95bf-90353dc811c4"
          async
        />
      </body>
    </html>
  )
}
