import { cn, getTechLogo, timeAgo } from '@/app/lib/utils'
import { Image, ScrollShadow } from '@nextui-org/react'
import { Doc, Id } from '~/convex/_generated/dataModel'

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
          <div className="grid grid-cols-1 md:grid-cols-[24px_1fr] gap-4 px-6 py-4">
            <Image
              width={24}
              height={24}
              src={getTechLogo('icon.svg', 'light')}
            />
            <div className="flex flex-col gap-1">
              <h5 className="font-semibold">{n.title}</h5>
              <p
                className="text-xs text-foreground-600"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: n.details }}
              />
              <time className="text-tiny text-default-400">
                {timeAgo(n._creationTime, true)} ago
              </time>
            </div>
          </div>
        </div>
      ))}
    </ScrollShadow>
  )
}
