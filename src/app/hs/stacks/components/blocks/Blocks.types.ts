import { Doc } from '~/convex/_generated/dataModel'
import { WithoutSystemFields } from 'convex/server'
import { ShareStackBlockSettings} from '@/app/hs/stacks/components/share/ShareStack.types'

export type TechWithoutSystemFields = WithoutSystemFields<Doc<'tech'>>

export type BlockNodeData = {
  id: string
  blockName: string
  tech: TechWithoutSystemFields
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
