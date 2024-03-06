import { authMutation, authQuery } from '~/convex/utils'
import { ConvexError, v } from 'convex/values'
import { getOneFrom } from 'convex-helpers/server/relationships'
import { internalMutation, internalQuery } from '~/convex/_generated/server'

export const getUserSettings = authQuery({
  args: {
    userId: v.id('users')
  },
  handler: async ({ db }, { userId }) => {
    return await getOneFrom(db, 'userSettings', 'by_userId', userId)
  }
})

export const updateUserSettings = authMutation({
  args: {
    settingsId: v.id('userSettings'),
    feedbackReceivedEmail: v.optional(v.boolean()),
    feedbackReceivedInApp: v.optional(v.boolean()),
    feedbackReplyEmail: v.optional(v.boolean()),
    feedbackReplyInApp: v.optional(v.boolean()),
    suggestionApprovedEmail: v.optional(v.boolean()),
    suggestionApprovedInApp: v.optional(v.boolean()),
    suggestionRejectedEmail: v.optional(v.boolean()),
    suggestionRejectedInApp: v.optional(v.boolean()),
    promotionEmail: v.optional(v.boolean())
  },
  handler: async ({ db }, args) => {
    const { settingsId, ...rest } = args
    return await db.patch(settingsId, {
      ...rest
    })
  }
})

export const internalGetUserSettings = internalQuery({
  args: {
    userId: v.id('users')
  },
  handler: async (ctx, { userId }) => {
    return await getUserSettings(ctx, { userId })
  }
})

export const internalCreateUserSettings = internalMutation({
  args: {
    userId: v.id('users')
  },
  handler: async ({ db }, { userId }) => {
    return await db.insert('userSettings', {
      userId,
      feedbackReceivedEmail: false,
      feedbackReceivedInApp: true,
      feedbackReplyEmail: false,
      feedbackReplyInApp: true,
      suggestionApprovedEmail: true,
      suggestionApprovedInApp: true,
      suggestionRejectedEmail: true,
      suggestionRejectedInApp: true,
      promotionEmail: true
    })
  }
})

export const internalUnsubscribe = internalMutation({
  args: {
    email: v.string(),
    type: v.union(
      v.literal('suggestionApprovedEmail'),
      v.literal('suggestionRejectedEmail'),
      v.literal('feedbackReceivedEmail'),
      v.literal('feedbackReplyEmail'),
      v.literal('promotionEmail')
    )
  },
  handler: async ({ db }, { email, type }) => {
    try {
      const user = await db
        .query('users')
        .filter((q) => q.eq(q.field('email'), email))
        .first()
      if (!user) return false
      const settings = await getOneFrom(
        db,
        'userSettings',
        'by_userId',
        user._id
      )
      if (!settings) return false
      await db.patch(settings._id, {
        [type]: false
      })
      return true
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      new ConvexError(error?.message)
      return false
    }
  }
})
