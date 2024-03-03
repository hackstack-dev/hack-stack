'use client'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import UserSettings from '@/app/hs/settings/[userId]/UserSettings'

export default function UserSettingsPage({
  params
}: { params: { userId: Id<'users'> } }) {
  const userId = params.userId

  return <div className="mt-8"><UserSettings userId={userId} /></div>
}
