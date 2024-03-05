import {
  adminAuthAction,
  adminAuthQuery,
  authAction,
  authQuery,
  pointsPerSuggestionType
} from '~/convex/utils'
import { Suggestion, SuggestionWithoutUser } from '~/convex/types'
import { internalMutation, internalQuery } from '~/convex/_generated/server'
import { internal } from '~/convex/_generated/api'
import { v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { internalGetUserSettings } from '~/convex/userSettings'
import { getOneFrom } from 'convex-helpers/server/relationships'

export const insertSuggestion = internalMutation({
  handler: async ({ db }, newSuggestion: Suggestion) => {
    return await db.insert('suggestions', newSuggestion)
  }
})

export const saveSuggestion = authAction(
  async (
    { user, runMutation, runAction },
    suggestion: SuggestionWithoutUser
  ) => {
    const userId = user._id
    let newSuggestion = {
      ...suggestion,
      userId
    }

    if (suggestion.logo) {
      const logos = await runAction(internal.imageKit.uploadLogo, {
        logo: suggestion.logo,
        name: suggestion.name
      })
      newSuggestion = {
        ...newSuggestion,
        logo: logos.logo,
        darkLogo: logos.darkLogo,
        logoIds: logos.logoIds
      }
    }
    await runMutation(internal.suggestions.insertSuggestion, newSuggestion)
    await runAction(internal.email.sendEmail, {
      subject: 'Suggestion Received',
      html: `<p>A suggestion for <b>${suggestion.name}</b> has been received.</p>`
    })
  }
)

export const getSuggestionById = internalQuery({
  args: {
    suggestionId: v.id('suggestions')
  },
  handler: async ({ db }, { suggestionId }) => {
    return await db.get(suggestionId)
  }
})

export const getSuggestions = adminAuthQuery({
  args: {
    approved: v.boolean(),
    paginationOpts: paginationOptsValidator
  },
  handler: async ({ db }, { paginationOpts, approved }) => {
    return await db
      .query('suggestions')
      .filter((q) => q.eq(q.field('approved'), approved))
      .paginate(paginationOpts)
  }
})

export const internalApproveSuggestion = internalMutation({
  args: {
    suggestionId: v.id('suggestions'),
    newLogoName: v.string()
  },
  handler: async ({ db }, { suggestionId, newLogoName }) => {
    return await db.patch(suggestionId, { approved: true, logo: newLogoName })
  }
})

export const approveSuggestion = adminAuthAction({
  args: {
    suggestionId: v.id('suggestions'),
    token: v.union(v.string(), v.null())
  },
  handler: async (
    { runQuery, runMutation, runAction },
    { suggestionId, token }
  ) => {
    const suggestion = await runQuery(internal.suggestions.getSuggestionById, {
      suggestionId
    })

    const newLogoName =
      suggestion?.name?.replaceAll(' ', '')?.toLowerCase() ?? 'logo'

    if (suggestion?.type === 'category') {
      await runMutation(internal.categories.internalInsertCategory, {
        name: suggestion.name
      })
    }

    if (suggestion?.type === 'block' && suggestion.category) {
      await runMutation(internal.blocks.internalInsertBlock, {
        name: suggestion.name,
        description: suggestion.description ?? '',
        category: suggestion.category,
        tags: suggestion.tags ?? []
      })
    }

    if (suggestion?.type === 'tech' && suggestion.blockId) {
      await runMutation(internal.tech.internalInsertTech, {
        name: suggestion.name,
        icon: `${newLogoName}.svg`,
        githubUrl: suggestion.githubUrl ?? '',
        websiteUrl: suggestion.websiteUrl ?? '',
        description: suggestion.description ?? '',
        blockId: suggestion.blockId
      })
    }

    if (suggestion?.logo && suggestion.darkLogo) {
      await runAction(internal.imageKit.approveSuggestionLogo, {
        logo: suggestion.logo,
        darkLogo: suggestion.darkLogo,
        newName: newLogoName
      })
    }
    // update suggestion to approved and new logo name
    await runMutation(internal.suggestions.internalApproveSuggestion, {
      suggestionId,
      newLogoName: `${newLogoName}.svg`
    })
    // insert new notification for user who suggested if they have in app notifications enabled
    if (suggestion) {
      const userSettings = await runQuery(
        internal.userSettings.internalGetUserSettings,
        {
          userId: suggestion.userId
        }
      )
      if (userSettings?.suggestionApprovedInApp) {
        await runMutation(internal.notifications.internalAddNotification, {
          targetUserId: suggestion.userId,
          data: {
            suggestion: suggestion.name,
            type: suggestion.type,
            points: pointsPerSuggestionType[suggestion.type]
          },
          type: 'suggestionApproved'
        })
      }
      if (userSettings?.suggestionApprovedEmail && token) {
        const user = await runQuery(internal.users.getUserById, {
          userId: suggestion.userId
        })
        if (!user) return true
        await runAction(internal.email.sendEmailToUser, {
          subject: 'Suggestion Approved',
          from: 'app@hackstack.hackazen.com',
          to: user.email,
          type: 'suggestionApprovedEmail',
          data: {
            username: user.name,
            suggestionType: suggestion.type,
            suggestion: suggestion.name,
            points: pointsPerSuggestionType[suggestion.type]
          },
          token
        })
      }
    }

    return true
  }
})

export const internalDeleteSuggestion = internalMutation({
  args: {
    suggestionId: v.id('suggestions')
  },
  handler: async ({ db }, { suggestionId }) => {
    return await db.delete(suggestionId)
  }
})

export const deleteSuggestion = adminAuthAction({
  args: {
    token: v.union(v.string(), v.null()),
    suggestionId: v.id('suggestions'),
    rejectReason: v.string()
  },
  handler: async (
    { runQuery, runMutation, runAction },
    { suggestionId, rejectReason, token }
  ) => {
    const suggestion = await runQuery(internal.suggestions.getSuggestionById, {
      suggestionId
    })
    if (suggestion?.logoIds) {
      await runAction(internal.imageKit.deleteSuggestionLogo, {
        logoIds: suggestion.logoIds
      })
    }

    await runMutation(internal.suggestions.internalDeleteSuggestion, {
      suggestionId
    })

    if (!suggestion) return true
    const userSettings = await runQuery(
      internal.userSettings.internalGetUserSettings,
      {
        userId: suggestion.userId
      }
    )
    if (userSettings?.suggestionRejectedInApp) {
      await runMutation(internal.notifications.internalAddNotification, {
        targetUserId: suggestion.userId,
        data: {
          suggestion: suggestion.name,
          type: suggestion.type,
          rejectReason
        },
        type: 'suggestionRejected'
      })
    }
    if (userSettings?.suggestionRejectedEmail && token) {
      const user = await runQuery(internal.users.getUserById, {
        userId: suggestion.userId
      })
      if (!user) return true
      await runAction(internal.email.sendEmailToUser, {
        subject: 'Suggestion Rejected',
        from: 'app@hackstack.hackazen.com',
        to: user.email,
        type: 'suggestionRejectedEmail',
        data: {
          username: user.name,
          suggestionType: suggestion.type,
          suggestion: suggestion.name,
          reason: rejectReason
        },
        token
      })
    }
    return true
  }
})

export const getUserSuggestions = authQuery({
  args: {
    userId: v.id('users')
  },
  handler: async ({ db }, { userId }) => {
    const userSuggestions = await db
      .query('suggestions')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('approved'), true))
      .collect()

    const totalPoints = userSuggestions.reduce((acc, suggestion) => {
      return acc + pointsPerSuggestionType[suggestion.type]
    }, 0)

    const suggestions = userSuggestions.map((suggestion) => {
      return {
        ...suggestion,
        points: pointsPerSuggestionType[suggestion.type]
      }
    })

    return {
      suggestions,
      totalPoints
    }
  }
})
