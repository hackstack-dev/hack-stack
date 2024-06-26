import type { Infer } from 'convex/values'
import type {
  stacksValidator,
  suggestionsValidator,
  userSettingsValidator
} from '~/convex/schema'
import type { Id } from '~/convex/_generated/dataModel'

export type Stack = Omit<Infer<typeof stacksValidator>, 'userId'>

export type MostUsedStatsData = [
  string,
  { count: number; percent: number; icon: string }
][]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type UnwrapConvex<T extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<T>
>
export type Suggestion = Infer<typeof suggestionsValidator>
export type SuggestionWithoutUser = Omit<Suggestion, 'userId'>

export type UserSettings = Infer<typeof userSettingsValidator>
export type UserSettingsWithoutUser = Omit<UserSettings, 'userId'>

export type SuggestionTypeCount = {
  category: number
  block: number
  tech: number
  points: number
}

export type BuilderUser = {
  userId: Id<'users'>
  count: number
}
