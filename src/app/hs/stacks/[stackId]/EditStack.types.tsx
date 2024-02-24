import { Stack } from '~/convex/types'
import { Id } from '~/convex/_generated/dataModel'

export interface EditStackSectionProps {
  stack: Stack
  stackId: Id<'stacks'>
}
