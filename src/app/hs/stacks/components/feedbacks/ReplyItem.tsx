import { Avatar, Divider } from '@nextui-org/react'
import { timeAgo } from '@/app/lib/utils'
import { FeedbackReply } from '@/app/hs/stacks/components/feedbacks/Feedbacks.types'
import React from 'react'

interface ReplyItemProps {
  item: FeedbackReply
}
export default function ReplyItem({ item }: ReplyItemProps) {
  const { user, reply, _creationTime } = item
  return (
    <div className="grid grid-cols-1 md:grid-cols-[32px_1fr] gap-2 p-3 my-2 ml-10 bg-secondary/10 dark:bg-secondary/15 rounded-large">
      <Avatar src={user.profileImage} className="h-5 w-5" />
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-semibold">{user.name}</span>
        <p className="text-sm text-default-600 dark:text-default-500">{reply}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] text-default-500 dark:text-default-400">
            {timeAgo(_creationTime, true)}
          </span>
        </div>
      </div>
    </div>
  )
}
