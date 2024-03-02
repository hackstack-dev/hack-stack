import { useMutation, usePaginatedQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { Avatar, ScrollShadow } from '@nextui-org/react'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { timeAgo } from '@/app/lib/utils'
import FeedbackItem from '@/app/hs/stacks/components/feedbacks/FeedbackItem'
import { Button } from '@nextui-org/button'
import React from 'react'

interface FeedbackListProps {
  stackId?: Id<'stacks'>
}
export default function FeedbackList({ stackId }: FeedbackListProps) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.feedbacks.getFeedbacksByStackId,
    stackId ? { stackId } : 'skip',
    { initialNumItems: 1 }
  )

  const sendReply = useMutation(api.feedbacks.createReply)

  const handleSendReply = async (
    feedbackId: Id<'feedbacks'>,
    reply: string
  ) => {
    try {
      await sendReply({ feedbackId, reply })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mt-4 px-6 flex flex-col">
      {results.map((feedback) => (
        <FeedbackItem
          key={feedback._id}
          data={feedback}
          onSendReply={handleSendReply}
        />
      ))}
      {status !== 'Exhausted' && (
        <div className="mt-4 w-full flex justify-center">
          <Button
            size="sm"
            color="secondary"
            variant="flat"
            disabled={status !== 'CanLoadMore'}
            onClick={() => loadMore(1)}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
