'use node'

import { Resend } from 'resend'
import { internalAction } from '~/convex/_generated/server'
import { v } from 'convex/values'
import { imageKit } from '~/convex/imageKit'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = internalAction({
  args: { subject: v.string(), html: v.string() },
  handler: async (_, { subject, html }) => {
    return resend.emails.send({
      from: 'notifications@hackstack.hackazen.com',
      to: 'hackstack2024@gmail.com',
      subject,
      html
    })
  }
})
