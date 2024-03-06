import { authAction, authMutation, authQuery } from '~/convex/utils'
import { v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { getOneFrom } from 'convex-helpers/server/relationships'
import { internal } from '~/convex/_generated/api'
import { internalMutation } from '~/convex/_generated/server'
import { UnwrapConvex } from '~/convex/types'

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

export const internalAddFeedback = internalMutation({
  args: {
    stackId: v.id('stacks'),
    fromUserId: v.id('users'),
    feedback: v.string()
  },
  handler: async ({ db }, { stackId, fromUserId, feedback }) => {
    return await db.insert('feedbacks', {
      stackId,
      fromUserId,
      feedback
    })
  }
})

export const createFeedback = authAction({
  args: {
    stackId: v.id('stacks'),
    feedback: v.string(),
    token: v.union(v.string(), v.null())
  },
  handler: async (
    { runQuery, runMutation, runAction, user },
    { stackId, feedback, token }
  ) => {
    const insertResult = (await runMutation(
      internal.feedbacks.internalAddFeedback,
      { stackId, feedback, fromUserId: user._id }
    )) as UnwrapConvex<typeof internalAddFeedback>

    // notify unless the user is giving feedback to their own stack
    const stack = await runQuery(internal.stack.internalGetStack, {
      stackId
    })

    if (!stack || stack.userId === user._id) return insertResult

    const userSettings = await runQuery(
      internal.userSettings.internalGetUserSettings,
      {
        userId: stack.userId
      }
    )

    const sourceUser = await runQuery(internal.users.getUserById, {
      userId: user._id
    })

    if (sourceUser && userSettings?.feedbackReceivedInApp) {
      await runMutation(internal.notifications.internalAddNotification, {
        sourceUserId: user._id,
        targetUserId: stack.userId,
        data: {
          stackName: stack.name,
          stackId: stack._id,
          username: sourceUser.name,
          userProfileImage: sourceUser.profileImage
        },
        type: 'feedback',
        isRead: false
      })
    }
    if (sourceUser && userSettings?.suggestionApprovedEmail && token) {
      const targetUser = await runQuery(internal.users.getUserById, {
        userId: stack.userId
      })

      if (!targetUser) return insertResult

      const unsubscribeToken = await runAction(
        internal.email.getUnsubscribeToken,
        {
          email: targetUser.email
        }
      )
      await runAction(internal.email.sendEmailToUser, {
        subject: 'Feedback Received',
        from: 'app@hackstack.hackazen.com',
        to: targetUser.email,
        type: 'feedbackReceivedEmail',
        data: {
          targetUserEmail: targetUser.email,
          sourceUserName: sourceUser.name,
          sourceUserImage: sourceUser.profileImage,
          stackName: stack.name,
          stackId: stack._id,
          feedback,
          unsubscribeToken
        },
        token
      })
    }
    return insertResult
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

    const userSettings = await getOneFrom(
      db,
      'userSettings',
      'by_userId',
      stack.userId
    )
    // if(userSettings?.feedbackReplyEmail) {
    //   // ToDo: notify via email
    //   // send email
    // }
    if (!userSettings?.feedbackReplyInApp) return insertResult
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
