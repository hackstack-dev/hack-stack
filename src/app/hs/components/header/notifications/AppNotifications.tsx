import { LucideBell } from 'lucide-react'
import {
  Badge,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs
} from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import { useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import NotificationList from '@/app/hs/components/header/notifications/NotificationList'
import EmptyData from '@/app/hs/components/ui/EmptyData'

export default function AppNotifications() {
  const notifications =
    useQuery(api.notifications.getMyUserNotifications, {}) ?? []

  const unreadNotifications = notifications.filter((n) => !n.isRead)

  const markAsRead = useMutation(api.notifications.markAsRead)
  const markAllAsRead = useMutation(api.notifications.markAllAsRead)

  const allNotificationsCount = notifications.length
  const unreadCount = unreadNotifications.length

  const handleMarkAsRead = async (notificationId: Id<'notifications'>) => {
    await markAsRead({ notificationId })
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead({})
  }

  return (
    <Popover
      placement="bottom-end"
      classNames={{ content: 'p-0 items-start' }}
      backdrop="opaque"
      shouldBlockScroll
    >
      <Badge
        size="sm"
        content=""
        shape="circle"
        color="danger"
        isInvisible={unreadCount < 1}
        isOneChar
        isDot
      >
        <PopoverTrigger>
          <Button size="sm" variant="light" radius="full" isIconOnly>
            <LucideBell size={18} />
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent className="w-[400px]">
        <div className="pt-3 w-full">
          <div className="flex items-center justify-between px-5 py-2">
            <h4 className="text-large font-medium">Notifications</h4>
            <Button
              color="primary"
              size="sm"
              variant="light"
              radius="full"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount < 1}
            >
              Mark all as read
            </Button>
          </div>
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              base: 'flex w-full',
              tabList:
                'gap-6 w-full relative rounded-none p-0 border-b border-divider',
              cursor: 'w-full bg-primary',
              tab: 'px-4 h-12',
              panel: 'p-0'
            }}
          >
            <Tab
              key="unread"
              title={
                <div className="flex items-center space-x-2">
                  <span>Unread</span>
                  <Chip size="sm" variant="flat">
                    {unreadCount}
                  </Chip>
                </div>
              }
            >
              {unreadNotifications.length < 1 && (
                <div className="mt-4">
                  <EmptyData />
                </div>
              )}
              <NotificationList
                notifications={unreadNotifications}
                markAsRead={handleMarkAsRead}
              />
            </Tab>
            <Tab
              key="all"
              title={
                <div className="flex items-center space-x-2">
                  <span>All</span>
                  <Chip size="sm" variant="flat">
                    {allNotificationsCount}
                  </Chip>
                </div>
              }
            >
              {notifications.length < 1 && (
                <div className="mt-4">
                  <EmptyData />
                </div>
              )}
              <NotificationList
                notifications={notifications}
                markAsRead={handleMarkAsRead}
              />
            </Tab>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}
