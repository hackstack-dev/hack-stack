import { Doc } from '~/convex/_generated/dataModel'
import { WithoutSystemFields } from 'convex/server'

export type BlockNodeData = {
  id: string
  blockName: string
  tech: WithoutSystemFields<Doc<'tech'>>
}

export interface AddBlockProps {
  onAddBlock: (nodeData: BlockNodeData) => void
}
