import { Doc } from '~/convex/_generated/dataModel'
import { z } from 'zod'
export type ProjectType = Doc<'stacks'>['projectTypes']

export const stackFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Stack name must contain at least 2 characters')
    .max(50),
  projectTypes: z
    .array(z.string())
    .min(1, 'Please select at least one project type'),
  sourceCodeUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional()
})

export type StackForm = z.infer<typeof stackFormSchema>

export type StackState = StackForm & {
  template: Doc<'templates'>
}
export interface StackStateProps {
  stackState: StackState
  onStateChange: (newState: Partial<StackState>) => void
}
