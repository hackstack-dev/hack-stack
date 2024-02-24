import { cn, timeAgo } from '@/app/lib/utils'
import { ScrollShadow } from '@nextui-org/react'
import { Doc, Id } from '~/convex/_generated/dataModel'
import SuggestionApproved from '@/app/hs/components/header/notifications/messages/SuggestionApproved'
import NewFeedbackOrReply from '@/app/hs/components/header/notifications/messages/NewFeedbackOrReply'

interface NotificationListProps {
  notifications: Doc<'notifications'>[]
  markAsRead: (notificationId: Id<'notifications'>) => Promise<void>
}
export default function NotificationList({
  notifications,
  markAsRead
}: NotificationListProps) {
  return (
    <ScrollShadow className="w-full h-[300px]">
      {notifications.map((n) => (
        <div
          key={n._id}
          className={cn(
            'border-b border-divider cursor-pointer',
            !n.isRead && 'bg-secondary/10'
          )}
          onClick={() => !n.isRead && markAsRead(n._id)}
        >
          <div className="px-6 py-4">
            {n.type === 'suggestionApproved' && (
              <SuggestionApproved data={n.data} />
            )}
            {['feedback', 'feedbackReply'].includes(n.type) && (
              <NewFeedbackOrReply data={n.data} type={n.type} />
            )}
            <time className="block mt-2 pl-10 text-tiny text-default-400">
              {timeAgo(n._creationTime, true)}
            </time>
          </div>
        </div>
      ))}
    </ScrollShadow>
  )
}
