'use client'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import UserSettings from '@/app/hs/settings/[userId]/UserSettings'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'

export default function UserSettingsPage({
  params
}: { params: { userId: Id<'users'> } }) {
  const myUser = useQuery(api.users.getMyUser, {})
  const userId = params.userId
  if (myUser && myUser._id !== userId) {
    return null
  }
  return (
    <div className="mt-8">
      {!myUser && <PageDataLoading />}
      {myUser && <UserSettings userId={userId} />}
    </div>
  )
}
