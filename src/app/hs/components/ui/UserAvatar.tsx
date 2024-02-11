import { Id } from '~/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Avatar } from '@nextui-org/react'
import React from 'react'

interface UserAvatarProps {
  userId: Id<'users'>
  withName?: boolean
}
export default function UserAvatar({
  userId,
  withName = false
}: UserAvatarProps) {
  const user = useQuery(api.users.getProfile, { userId })
  const userName = user?.name === 'null null' ? '' : user?.name
  return (
    <div className="flex flex-col items-center">
      <Avatar size="sm" src={user?.profileImage} />
      {withName && userName && <span className="text-xs">{userName}</span>}
    </div>
  )
}
