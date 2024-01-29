import AppHeader from '@/app/hs/components/header/AppHeader'
import { Suspense } from 'react'

export default function HackStackLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <AppHeader />
      <section>{children}</section>
    </main>
  )
}
