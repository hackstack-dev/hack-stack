import React from 'react'
import ReactFlow, {
  Node,
  OnNodesChange,
  Background,
  BackgroundVariant,
  NodeChange
} from 'reactflow'

import 'reactflow/dist/style.css'
import { useTheme } from 'next-themes'
import BlockNode from '@/app/hs/stacks/components/blocks/BlockNode'
import useSetCenter from '@/app/hs/stacks/components/blocks/hooks/useSetCenter'

const nodeTypes = {
  blockNode: BlockNode
}

interface FlowProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  onNodesChange: OnNodesChange
  viewOnly?: boolean
}
export default function Flow({
  nodes,
  onNodesChange,
  viewOnly = false
}: FlowProps) {
  const { theme } = useTheme()
  const backgroundColor = theme === 'light' ? '#1f2937' : '#8b5cf6'
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
      <Background color={backgroundColor} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
