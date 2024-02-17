import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'

interface UserProfileProps {
  userId: Id<'users'>
}
export default function UserProfile({ userId }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center">
      <UserAvatar
        userId={userId}
        size="lg"
        className="w-60 h-60 text-lg"
        nameClassName="text-2xl font-semibold mt-8"
        withName
      />
    </div>
  )
}
