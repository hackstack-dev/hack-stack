import { Avatar, Divider } from '@nextui-org/react'
import { timeAgo } from '@/app/lib/utils'
import { Feedback } from '@/app/hs/stacks/components/feedbacks/Feedbacks.types'
import React from 'react'
import FeedbackInput from '@/app/hs/stacks/components/feedbacks/FeedbackInput'
import { Id } from '~/convex/_generated/dataModel'
import ReplyItem from '@/app/hs/stacks/components/feedbacks/ReplyItem'
import Link from "next/link";

interface FeedbackItemProps {
  data: Feedback
  onSendReply: (feedbackId: Id<'feedbacks'>, reply: string) => void
}
export default function FeedbackItem({ data, onSendReply }: FeedbackItemProps) {
  const { _id, user, feedback, _creationTime, feedbackReplies } = data
  const [showReplayInput, setShowReplayInput] = React.useState(false)

  const handleReply = (reply: string) => {
    onSendReply(_id, reply)
    setShowReplayInput(false)
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[32px_1fr] gap-4 pt-6">
        <Link href={`/hs/profile/${user.id}`}><Avatar src={user.profileImage} size="sm" /></Link>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold">{user.name}</span>
          <p className="text-default-600 dark:text-default-500">{feedback}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-default-500 dark:text-default-400">
              {timeAgo(_creationTime, true)}
            </span>
            <Divider orientation="vertical" />
            <span
              className="cursor-pointer font-semibold text-secondary"
              onClick={() => setShowReplayInput((p) => !p)}
            >
              Replay
            </span>
          </div>
        </div>
      </div>
      {showReplayInput && (
        <FeedbackInput
          avatarSize="sm"
          onSendReply={handleReply}
          placeholder="Reply to this feedback..."
        />
      )}
      {feedbackReplies?.map((reply) => (
        <ReplyItem key={reply._id} item={reply} />
      ))}

      <Divider className="mt-6" />
    </>
  )
}
