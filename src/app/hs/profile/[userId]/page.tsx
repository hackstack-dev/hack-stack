'use client'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import UserProfile from '@/app/hs/profile/[userId]/UserProfile'
import UserProfileItems from '@/app/hs/profile/[userId]/items/UserProfileItems'

export default function EditTemplatePage({
  params
}: { params: { userId: Id<'users'> } }) {
  const userId = params.userId

  return (
    <div className="w-full grid grid-col-1 md:grid-cols-[300px_1fr] gap-12 py-6">
      <UserProfile userId={userId} />
      <UserProfileItems userId={userId} />
    </div>
  )
}
