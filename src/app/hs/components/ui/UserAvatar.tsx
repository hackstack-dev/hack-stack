import { Id } from '~/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Avatar } from '@nextui-org/react'
import React from 'react'

export interface UserAvatarProps {
  userId: Id<'users'>
  size?: 'sm' | 'md' | 'lg'
  className?: string
  nameClassName?: string
  withName?: boolean
}
export default function UserAvatar({
  userId,
  size = 'sm',
  className = '',
  nameClassName = 'text-sm',
  withName = false
}: UserAvatarProps) {
  const user = useQuery(api.users.getProfile, { userId })
  const userName = user?.name === 'null null' ? '' : user?.name
  return (
    <div className="flex flex-col items-center">
      <Avatar size={size} src={user?.profileImage} className={className} />
      {withName && userName && (
        <span className={nameClassName}>{userName}</span>
      )}
    </div>
  )
}
