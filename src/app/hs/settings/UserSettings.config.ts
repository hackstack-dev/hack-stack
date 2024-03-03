import { UserSettingsWithoutUser } from '~/convex/types'

export const userSettingsConfig: Record<
  keyof UserSettingsWithoutUser,
  {
    label: string
    description: string
    defaultValue: boolean
  }
> = {
  feedbackReceivedEmail: {
    label: 'Feedback received email',
    description: 'Receive an email when you receive feedback',
    defaultValue: false
  },
  feedbackReceivedInApp: {
    label: 'Feedback received in app',
    description: 'Receive an in-app notification when you receive feedback',
    defaultValue: true
  },
  feedbackReplyEmail: {
    label: 'Feedback reply email',
    description: 'Receive an email when someone replies to your feedback',
    defaultValue: false
  },
  feedbackReplyInApp: {
    label: 'Feedback reply in app',
    description:
      'Receive an in-app notification when someone replies to your feedback',
    defaultValue: true
  },
  suggestionApprovedEmail: {
    label: 'Suggestion approved email',
    description: 'Receive an email when your suggestion is approved',
    defaultValue: true
  },
  suggestionApprovedInApp: {
    label: 'Suggestion approved in app',
    description:
      'Receive an in-app notification when your suggestion is approved',
    defaultValue: true
  },
  suggestionRejectedEmail: {
    label: 'Suggestion rejected email',
    description: 'Receive an email when your suggestion is rejected',
    defaultValue: true
  },
  suggestionRejectedInApp: {
    label: 'Suggestion rejected in app',
    description:
      'Receive an in-app notification when your suggestion is rejected',
    defaultValue: true
  },
  promotionEmail: {
    label: 'Promotion email',
    description: 'Receive promotional emails from us',
    defaultValue: true
  }
}
