import { Infer } from 'convex/values'
import { stacksValidator, suggestionsValidator } from '~/convex/schema'

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
