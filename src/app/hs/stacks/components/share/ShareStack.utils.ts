import { Stack } from '~/convex/types'
import type { Node } from 'reactflow'
import { StackDetailsNodeData } from '@/app/hs/stacks/components/share/ShareStack.types'

export const getDetailsNode = (stack: Stack) => {
  const detailsNode: Node<StackDetailsNodeData> = {
    id: 'stackDetails',
    type: 'stackDetailsNode',
    position: { x: 0, y: 0 },
    data: {
      show: true,
      name: stack.name,
      description: stack?.description ?? '',
      style: {
        background: '#ffffff',
        color: '#000000',
        fontSize: 16,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 4,
        descriptionColor: '',
        descriptionFontSize: 0
      }
    }
  }
  return detailsNode
}

