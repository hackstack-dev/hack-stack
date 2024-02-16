import { adminAuthAction, adminAuthQuery, authAction } from '~/convex/utils'
import { Suggestion, SuggestionWithoutUser, UnwrapConvex } from '~/convex/types'
import { internalMutation, internalQuery } from '~/convex/_generated/server'
import { internal } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { v } from 'convex/values'

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
  handler: async ({ db }, args) => {
    return await db.get(args.suggestionId)
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
  handler: async ({ db }, args) => {
    return await db.patch(args.suggestionId, { approved: true })
  }
})

export const approveSuggestion = adminAuthAction({
  args: {
    suggestionId: v.id('suggestions')
  },
  handler: async (ctx, args) => {
    const suggestion = await ctx.runQuery(
      internal.suggestions.getSuggestionById,
      {
        suggestionId: args.suggestionId
      }
    )

    const newLogoName =
      suggestion?.name?.replaceAll(' ', '')?.toLowerCase() ?? 'logo'

    if (suggestion?.type === 'category') {
      await ctx.runMutation(internal.categories.internalInsertCategory, {
        name: suggestion.name
      })
    }

    if (suggestion?.type === 'block' && suggestion.category) {
      await ctx.runMutation(internal.blocks.internalInsertBlock, {
        name: suggestion.name,
        description: suggestion.description ?? '',
        category: suggestion.category,
        tags: suggestion.tags ?? []
      })
    }

    if (suggestion?.type === 'tech' && suggestion.blockId) {
      await ctx.runMutation(internal.tech.internalInsertTech, {
        name: suggestion.name,
        icon: `${newLogoName}.svg`,
        githubUrl: suggestion.githubUrl ?? '',
        websiteUrl: suggestion.websiteUrl ?? '',
        description: suggestion.description ?? '',
        blockId: suggestion.blockId
      })
    }

    if (suggestion?.logo && suggestion.darkLogo) {
      await ctx.runAction(internal.imageKit.approveSuggestionLogo, {
        logo: suggestion.logo,
        darkLogo: suggestion.darkLogo,
        newName: newLogoName
      })
    }
    // update suggestion to approved
    await ctx.runMutation(internal.suggestions.internalApproveSuggestion, {
      suggestionId: args.suggestionId
    })

    return true
  }
})

export const internalDeleteSuggestion = internalMutation({
  args: {
    suggestionId: v.id('suggestions')
  },
  handler: async ({ db }, args) => {
    return await db.delete(args.suggestionId)
  }
})

export const deleteSuggestion = adminAuthAction({
  args: {
    suggestionId: v.id('suggestions')
  },
  handler: async (ctx, args) => {
    const suggestion = await ctx.runQuery(
      internal.suggestions.getSuggestionById,
      {
        suggestionId: args.suggestionId
      }
    )
    if (suggestion?.logoIds) {
      await ctx.runAction(internal.imageKit.deleteSuggestionLogo, {
        logoIds: suggestion.logoIds
      })
    }
    await ctx.runMutation(internal.suggestions.internalDeleteSuggestion, {
      suggestionId: args.suggestionId
    })
    return true
  }
})
