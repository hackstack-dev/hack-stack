import {
  adminAuthAction,
  adminAuthQuery,
  authAction,
  pointsPerSuggestionType
} from '~/convex/utils'
import { Suggestion, SuggestionWithoutUser, UnwrapConvex } from '~/convex/types'
import { internalMutation, internalQuery } from '~/convex/_generated/server'
import { internal } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { v } from 'convex/values'
import { internalAddNotification } from '~/convex/notifications'

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
      const logos = await runAction(internal.imageKit.upload, {
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
  handler: async ({ db }) => {
    return await db.query('suggestions').collect()
  }
})

export const internalApproveSuggestion = internalMutation({
  args: {
    suggestionId: v.id('suggestions')
  },
  handler: async ({ db }, { suggestionId }) => {
    return await db.patch(suggestionId, { approved: true })
  }
})

export const approveSuggestion = adminAuthAction({
  args: {
    suggestionId: v.id('suggestions')
  },
  handler: async ({ runQuery, runMutation, runAction }, { suggestionId }) => {
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
    // update suggestion to approved
    await runMutation(internal.suggestions.internalApproveSuggestion, {
      suggestionId
    })
    // insert new notification for user who suggested
    if (suggestion) {
      await runMutation(internal.notifications.internalAddNotification, {
        userId: suggestion.userId,
        title: 'Your suggestion has been approved',
        details: `Your suggestion for <b>${
            suggestion.name
        }</b> has been approved and is now live on the platform. You have earned <b>${
            pointsPerSuggestionType[suggestion.type]
        }</b> points for your suggestion!`,
        type: 'suggestion'
      })
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
    suggestionId: v.id('suggestions')
  },
  handler: async ({ runQuery, runMutation, runAction }, { suggestionId }) => {
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
    return true
  }
})
