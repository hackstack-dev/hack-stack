import { Doc, Id } from '~/convex/_generated/dataModel'
import { z } from 'zod'
export type ProjectType = Doc<'stacks'>['projectTypes']

export const stackFormSchema = z.object({
  name: z.string().min(2).max(50),
  projectTypes: z.array(z.string()).min(1),
  sourceCodeUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional()
})

export type StackForm = z.infer<typeof stackFormSchema>

export type StackState = StackForm & {
  templateId: Id<'templates'> | ''
}
export interface StackStateProps {
  stackState: StackState
  onStateChange: (newState: Partial<StackState>) => void
}
