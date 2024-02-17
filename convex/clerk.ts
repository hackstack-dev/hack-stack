'use node'

import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { internalAction } from './_generated/server'
import { Webhook } from 'svix'
import { v } from 'convex/values'

export const fulfill = internalAction({
  args: { headers: v.any(), payload: v.string() },
  handler: async (_, { headers, payload }) => {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string)
    return wh.verify(payload, headers) as WebhookEvent
  }
})
