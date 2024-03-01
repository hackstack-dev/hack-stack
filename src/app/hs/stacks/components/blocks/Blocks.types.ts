import { Doc } from '~/convex/_generated/dataModel'
import { WithoutSystemFields } from 'convex/server'

export type TechWithoutSystemFields = WithoutSystemFields<Doc<'tech'>>

export type BlockNodeData = {
  id: string
  blockName: string
  tech: TechWithoutSystemFields
}

export type GroupNodeData = {
  id: string
  blockName: string
}

export interface AddBlockProps {
  onAddBlock: (nodeData: BlockNodeData) => void
}

export type TechWithRepoData =
  | (Doc<'tech'> & {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      repoData?: any
    })
  | null
