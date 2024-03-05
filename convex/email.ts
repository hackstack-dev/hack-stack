'use node'

import { Resend } from 'resend'
import { internalAction } from '~/convex/_generated/server'
import { v } from 'convex/values'
import { imageKit } from '~/convex/imageKit'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = internalAction({
  args: { subject: v.string(), html: v.string() },
  handler: async ({ auth }, { subject, html }) => {
    return resend.emails.send({
      from: 'notifications@hackstack.hackazen.com',
      to: 'hackstack2024@gmail.com',
      subject,
      html
    })
  }
})

export const sendEmailToUser = internalAction({
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
  handler: async (_, payload) => {
    try {
      const res = await fetch('https://stacks.hackazen.com/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`
        },
        body: JSON.stringify(payload)
      })
      const json = await res.json()
      console.log({ json })
      return json
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error('Error sending email', error?.message)
      return false
    }
  }
})
