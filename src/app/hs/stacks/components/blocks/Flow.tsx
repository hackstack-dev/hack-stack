import React from 'react'
import ReactFlow, {
  Node,
  OnNodesChange,
  Background,
  BackgroundVariant,
  BackgroundProps,
  NodeChange
} from 'reactflow'

import 'reactflow/dist/style.css'
import { useTheme } from 'next-themes'
import BlockNode from '@/app/hs/stacks/components/blocks/node-types/BlockNode'
import useSetCenter from '@/app/hs/stacks/components/blocks/hooks/useSetCenter'
import CustomBlockNode from '@/app/hs/stacks/components/blocks/node-types/CustomBlockNode'
import StackDetailsNode from '@/app/hs/stacks/components/blocks/node-types/StackDetailsNode'

const nodeTypes = {
  blockNode: BlockNode,
  customBlockNode: CustomBlockNode,
  stackDetailsNode: StackDetailsNode
}

interface FlowProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  onNodesChange: OnNodesChange
  viewOnly?: boolean
  background?: BackgroundProps
}
export default function Flow({
  nodes,
  onNodesChange,
  viewOnly = false,
  background
}: FlowProps) {
  const { theme } = useTheme()

  const bgProps = React.useMemo(
    () =>
      background
        ? background
        : {
            color: theme === 'light' ? '#1f2937' : '#8b5cf6',
            variant: BackgroundVariant.Dots
          },
    [background, theme]
  )

  useSetCenter()

  const handleNodesChangechanges = (changes: NodeChange[]) => {
    if (viewOnly && changes.some((c) => c.type === 'remove')) return
    onNodesChange(changes)
  }
  return (
    <ReactFlow
      nodes={nodes}
      edges={[]}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChangechanges}
      proOptions={{ hideAttribution: true }}
      fitViewOptions={{ maxZoom: 1 }}
      fitView
    >
      <Background {...bgProps} />
    </ReactFlow>
  )
}
