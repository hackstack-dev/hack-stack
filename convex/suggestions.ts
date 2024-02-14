import { authAction, imageKit } from '~/convex/utils'
import { Suggestion, SuggestionWithoutUser } from '~/convex/types'
import { internalMutation } from '~/convex/_generated/server'
import { internal } from '~/convex/_generated/api'

export const insertSuggestion = internalMutation({
  handler: async ({ db }, newSuggestion: Suggestion) => {
    console.log(newSuggestion)
    return await db.insert('suggestions', newSuggestion)
  }
})

export const saveSuggestion = authAction(
  async (
    { user, runMutation, runAction },
    suggestion: SuggestionWithoutUser
  ) => {
    let logo = ''
    if (suggestion.logo) {
      logo = await runAction(internal.imageKit.upload, {
        logo: suggestion.logo,
        name: suggestion.name
      })
    }

    const userId = user._id
    const newSuggestion = { ...suggestion, userId, logo }
    await runMutation(internal.suggestions.insertSuggestion, newSuggestion)
  }
)
