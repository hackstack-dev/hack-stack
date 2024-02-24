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
    const insertResult = await db.insert('feedbacks', {
      stackId,
      fromUserId: user._id,
      feedback
    })
    // notify unless the user is giving feedback to their own stack
    const stack = await db.get(stackId)
    if (!stack || stack.userId === user._id) return insertResult
    return db.insert('notifications', {
      sourceUserId: user._id,
      targetUserId: stack.userId,
      data: {
        stackName: stack.name,
        stackId: stack._id,
        username: user.name,
        userProfileImage: user.profileImage
      },
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
    const insertResult = await db.insert('feedbackReplies', {
      feedbackId,
      fromUserId: user._id,
      reply
    })
    // notify unless the user is replying to their own feedback
    const feedback = await db.get(feedbackId)
    if (!feedback || feedback?.fromUserId === user._id) return insertResult
    const stack = await db.get(feedback.stackId)
    if (!stack) return insertResult
    return db.insert('notifications', {
      sourceUserId: user._id,
      targetUserId: feedback.fromUserId,
      data: {
        stackId: stack._id,
        stackName: stack.name,
        username: user.name,
        userProfileImage: user.profileImage
      },
      type: 'feedbackReply',
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
              user: {
                id: user?._id,
                name: user?.name,
                profileImage: user?.profileImage
              }
            }
          })
        )
        return {
          ...feedback,
          user: {
            id: user?._id,
            name: user?.name,
            profileImage: user?.profileImage
          },
          feedbackReplies
        }
      })
    )
    return { ...feedbacks, page: data }
  }
})
