import { authMutation, authQuery } from '~/convex/utils'
import { v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'

export const getFeedbackSettingsByStackId = authQuery({
  args: {
    stackId: v.id('stacks')
  },
  handler: async ({ db }, { stackId }) => {
    return db
      .query('feedbackSettings')
      .withIndex('by_stackId', (q) => q.eq('stackId', stackId))
      .first()
  }
})
export const saveFeedbackSettings = authMutation({
  args: {
    feedbackId: v.optional(v.id('feedbackSettings')),
    stackId: v.id('stacks'),
    focusAreas: v.optional(v.array(v.string())),
    additionalInfo: v.optional(v.string())
  },
  handler: async (
    { db, user },
    { feedbackId, stackId, focusAreas, additionalInfo }
  ) => {
    if (feedbackId) {
      return db.patch(feedbackId, { focusAreas, additionalInfo })
    }
    return db.insert('feedbackSettings', {
      userId: user._id,
      stackId,
      focusAreas,
      additionalInfo
    })
  }
})

export const createFeedback = authMutation({
  args: {
    stackId: v.id('stacks'),
    feedback: v.string()
  },
  handler: async ({ db, user }, { stackId, feedback }) => {
    await db.insert('feedbacks', {
      stackId,
      fromUserId: user._id,
      feedback
    })
    const stack = await db.get(stackId)
    if (!stack) return null
    return db.insert('notifications', {
      sourceUserId: user._id,
      targetUserId: stack.userId,
      title: 'New feedback',
      details: `You received a new feedback for stack <a href="hs/stacks/view/${stack._id}">${stack.name}</a>`,
      type: 'feedback',
      isRead: false
    })
  }
})

export const createReply = authMutation({
  args: {
    feedbackId: v.id('feedbacks'),
    reply: v.string()
  },
  handler: async ({ db, user }, { feedbackId, reply }) => {
    await db.insert('feedbackReplies', {
      feedbackId,
      fromUserId: user._id,
      reply
    })
    const feedback = await db.get(feedbackId)
    if (!feedback) return null
    return db.insert('notifications', {
      sourceUserId: user._id,
      targetUserId: feedback.fromUserId,
      title: 'New reply to feedback',
      details: 'You received a new reply to your feedback',
      type: 'feedback',
      isRead: false
    })
  }
})

export const getFeedbacksByStackId = authQuery({
  args: {
    stackId: v.id('stacks'),
    paginationOpts: paginationOptsValidator
  },
  handler: async ({ db }, { stackId, paginationOpts }) => {
    const feedbacks = await db
      .query('feedbacks')
      .withIndex('by_stackId', (q) => q.eq('stackId', stackId))
      .order('desc')
      .paginate(paginationOpts)

    const data = await Promise.all(
      feedbacks.page.map(async (feedback) => {
        const user = await db.get(feedback.fromUserId)
        const replies = await db
          .query('feedbackReplies')
          .withIndex('by_feedbackId', (q) => q.eq('feedbackId', feedback._id))
          .order('desc')
          .collect()
        // get user for each reply
        const feedbackReplies = await Promise.all(
          replies.map(async (reply) => {
            const user = await db.get(reply.fromUserId)
            return {
              ...reply,
              user: { name: user?.name, profileImage: user?.profileImage }
            }
          })
        )
        return {
          ...feedback,
          user: { name: user?.name, profileImage: user?.profileImage },
          feedbackReplies
        }
      })
    )
    return { ...feedbacks, page: data }
  }
})
