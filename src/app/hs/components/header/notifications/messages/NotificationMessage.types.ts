
export type SuggestionApprovedData = {
  suggestion: string
  type: string
  points: number
}

export type SuggestionRejectedData = {
  suggestion: string
  type: string
  rejectReason: string
}

export type NewFeedbackData = {
  username: string
  userProfileImage: string
  stackName: string
  stackId: string
}
