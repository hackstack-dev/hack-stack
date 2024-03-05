import { adminAuthAction } from '~/convex/utils'
import { internal } from '~/convex/_generated/api'
import { v } from 'convex/values'

export const testSendEmail = adminAuthAction({
  args: {
    token: v.string()
  },
  handler: async ({ runAction }, { token }) => {
    await runAction(internal.email.sendEmailToUser, {
      token,
      from: 'app@hackstack.hackazen.com',
      to: 'ofer.webdev@gmail.com',
      subject: 'Test suggestionApprovedEmail Email',
      type: 'suggestionApprovedEmail',
      data: {
        email: 'ofer.webdev@gmail.com',
        name: 'Ofer'
      }
    })
    return true
  }
})
