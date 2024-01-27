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
      <section className="container py-12 px-4">{children}</section>
    </main>
  )
}
