import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { LucideMessageCircle } from 'lucide-react'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import { formatNumber } from '@/app/lib/utils'

export default function FeedbacksCount({ stackId }: { stackId: Id<'stacks'> }) {
  const feedbacksCount = useQuery(api.feedbacks.getStackFeedbacksCount, {
    stackId
  })

  return (
    <div className="flex items-center gap-2 mx-2">
      <span className="text-xs text-default-400 dark:text-default-500">
        {formatNumber(feedbacksCount ?? 0)}
      </span>
      <LucideMessageCircle size={20} strokeWidth={1.5} />
    </div>
  )
}
