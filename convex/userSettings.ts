import { authMutation, authQuery } from '~/convex/utils'
import { v } from 'convex/values'
import { getManyFrom, getOneFrom } from 'convex-helpers/server/relationships'
import { Stack } from '~/convex/types'
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
  handler: async ({ db, user }, args) => {
    const userSettings = await getManyFrom(
      db,
      'userSettings',
      'by_userId',
      user._id
    )
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
