import React from 'react'
import ReactFlow, {
  Node,
  OnNodesChange,
  Background,
  BackgroundVariant
} from 'reactflow'

import 'reactflow/dist/style.css'
import { useTheme } from 'next-themes'
import BlockNode from '@/app/hs/stacks/create/components/steps/blocks/BlockNode'
import useSetCenter from '@/app/hs/stacks/create/components/steps/blocks/hooks/useSetCenter'

const nodeTypes = {
  blockNode: BlockNode
}

interface FlowProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  onNodesChange: OnNodesChange
}
export default function Flow({ nodes, onNodesChange }: FlowProps) {
  const { theme } = useTheme()
  const backgroundColor = theme === 'light' ? '#1f2937' : '#8b5cf6'

  useSetCenter()

  return (
    <ReactFlow
      nodes={nodes}
      edges={[]}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      proOptions={{ hideAttribution: true }}
      fitViewOptions={{ maxZoom: 1 }}
      fitView
    >
      <Background color={backgroundColor} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
