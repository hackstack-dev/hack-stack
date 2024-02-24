import { getTechLogo } from '@/app/lib/utils'
import { Avatar, Image } from '@nextui-org/react'
import {
  NewFeedbackData,
  SuggestionApprovedData
} from '@/app/hs/components/header/notifications/messages/NotificationMessage.types'
import Link from 'next/link'
import { Doc } from '~/convex/_generated/dataModel'

interface NewFeedbackProps {
  type: Doc<'notifications'>['type']
  data: NewFeedbackData
}
export default function NewFeedbackOrReply({ data, type }: NewFeedbackProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[24px_1fr] gap-4">
      <Avatar className="h-6 w-6" src={data.userProfileImage} />
      <div className="flex flex-col gap-1">
        <h5 className="font-semibold">
          {type === 'feedback' ? 'New feedback' : 'New Reply'}
        </h5>
        <p className="text-xs text-foreground-600">
          {type === 'feedback' && (
            <span>
              You received a new feedback from <b>{data.username}</b> for stack
            </span>
          )}
          {type === 'feedbackReply' && (
            <span>
              <b>{data.username}</b> replied to your feedback for stack
            </span>
          )}
          <Link
            className="ml-1 text-primary hover:text-primary/70"
            href={`/hs/stacks/view/${data.stackId}`}
          >
            {data.stackName}
          </Link>
        </p>
      </div>
    </div>
  )
}
