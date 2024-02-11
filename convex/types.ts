import { WithoutSystemFields } from 'convex/server'
import { Doc } from '~/convex/_generated/dataModel'
import { Infer } from 'convex/values'
import { stacksValidator } from '~/convex/schema'

export type Stack = Omit<Infer<typeof stacksValidator>, 'userId'>

export type MostUsedStatsData = [
  string,
  { count: number; percent: number; icon: string }
][]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type UnwrapConvex<T extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<T>
>
