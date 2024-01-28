import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import AppProviders from '@/app/providers/AppProviders'
import './globals.css'

const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

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
      <body className={jakartaSans.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
