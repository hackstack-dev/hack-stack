import { pointsPerSuggestionType } from '~/convex/utils'

export type SuggestionApprovedData = {
  suggestion: string
  type: string
  points: number
}

export type NewFeedbackData = {
  suggestion: string
  type: string
  points: number
}

export type NewReplyToFeedbackData = {
  suggestion: string
  type: string
  points: number
}
