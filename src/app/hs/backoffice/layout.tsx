'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import BackofficeNavigation from '@/app/hs/backoffice/BackofficeNavigation'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import React from 'react'

export default function BackOfficeLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const myUser = useQuery(api.users.getMyUser, {})
  if (myUser && !myUser.isAdmin) {
    router.push('/hs/404')
  }
  if (!myUser?.isAdmin) {
    return <PageDataLoading />
  }
  return (
    <section className="flex w-full h-[calc(100vh-66px)] border border-default-100 border-t-0">
      <BackofficeNavigation />
      {children}
    </section>
  )
}
