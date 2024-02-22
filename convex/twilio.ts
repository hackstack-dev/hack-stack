'use node'

import { internalAction } from '~/convex/_generated/server'
import { v } from 'convex/values'
import twilio from 'twilio'

export const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
)

export const sendNotification = internalAction({
  args: { eventType: v.union(v.literal('suggestion'), v.literal('newUser')) },
  handler: async (_, { eventType }) => {
    return client.messages.create({
      body: eventType === 'newUser' ? 'A new user has joined the platform!' : 'A new suggestion is pending approval!',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+972528198448'
    })
  }
})
