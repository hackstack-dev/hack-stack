import { adminAuthAction, pointsPerSuggestionType } from '~/convex/utils'
import { internal } from '~/convex/_generated/api'
import { v } from 'convex/values'

export const testSendEmail = adminAuthAction({
  args: {
    from: v.string(),
    to: v.string(),
    subject: v.string(),
    type: v.union(
      v.literal('suggestionApprovedEmail'),
      v.literal('suggestionRejectedEmail'),
      v.literal('feedbackReceivedEmail'),
      v.literal('feedbackReplyEmail'),
      v.literal('promotionEmail')
    ),
    data: v.any(),
    token: v.string()
  },
  handler: async ({ runAction }, args) => {
    const { token, ...payload } = args
    await runAction(internal.email.sendEmailToUser, {
      ...payload,
      token
    })
    return true
  }
})
