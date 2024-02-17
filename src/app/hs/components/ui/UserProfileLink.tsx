'use client'
import React from 'react'
import UserAvatar, { UserAvatarProps } from '@/app/hs/components/ui/UserAvatar'
import Link from 'next/link'

export default function UserProfileLink(props: UserAvatarProps) {
  return (
    <Link href={`/hs/profile/${props.userId}`} className="hover:text-secondary dark:hover:text-primary transition-colors">
      <UserAvatar {...props} />
    </Link>
  )
}
