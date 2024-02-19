import { authMutation, authQuery } from '~/convex/utils'
import { getManyFrom } from 'convex-helpers/server/relationships'
import { v } from 'convex/values'
import { internalMutation } from '~/convex/_generated/server'

export const getMyUserNotifications = authQuery({
  handler: async ({ db, user }) => {
    if (!user) return []
    return await getManyFrom(db, 'notifications', 'by_userId', user._id)
  }
})

export const markAsRead = authMutation({
  args: {
    notificationId: v.id('notifications')
  },
  handler: async ({ db }, { notificationId }) => {
    return await db.patch(notificationId, { isRead: true })
  }
})

export const markAllAsRead = authMutation({
  handler: async ({ db, user }) => {
    const notifications = await getManyFrom(
      db,
      'notifications',
      'by_userId',
      user._id
    )
    await Promise.all(
      notifications.map((n) => db.patch(n._id, { isRead: true }))
    )
  }
})

export const internalAddNotification = internalMutation({
  args: {
    userId: v.id('users'),
    title: v.string(),
    details: v.string(),
    type: v.union(v.literal('suggestion'), v.literal('achivement')),
  },
  handler: async ({ db }, args) => {
    return await db.insert('notifications', {
      ...args,
      isRead: false,
    })
  }
})
