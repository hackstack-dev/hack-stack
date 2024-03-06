import { authMutation, authQuery } from '~/convex/utils'
import { getManyFrom } from 'convex-helpers/server/relationships'
import { v } from 'convex/values'
import { internalMutation } from '~/convex/_generated/server'

export const getMyUserNotifications = authQuery({
  handler: async ({ db, user }) => {
    if (!user) return []
    return db
      .query('notifications')
      .withIndex('by_targetUserId', (q) => q.eq('targetUserId', user._id))
      .order('desc')
      .collect()
    // return await getManyFrom(db, 'notifications', 'by_targetUserId', user._id)
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
      'by_targetUserId',
      user._id
    )
    await Promise.all(
      notifications.map((n) => db.patch(n._id, { isRead: true }))
    )
  }
})

export const internalAddNotification = internalMutation({
  args: {
    targetUserId: v.id('users'),
    type: v.union(
      v.literal('suggestionApproved'),
      v.literal('suggestionRejected'),
      v.literal('achivement'),
      v.literal('feedback'),
      v.literal('feedbackReply')
    ),
    data: v.any()
  },
  handler: async ({ db }, args) => {
    return await db.insert('notifications', {
      ...args,
      isRead: false
    })
  }
})
