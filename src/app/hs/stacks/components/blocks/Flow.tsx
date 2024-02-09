import React from 'react'
import ReactFlow, {
  Node,
  OnNodesChange,
  Background,
  BackgroundVariant
} from 'reactflow'

import 'reactflow/dist/style.css'
import { useTheme } from 'next-themes'
import BlockNode from '@/app/hs/stacks/components/blocks/BlockNode'
import useSetCenter from '@/app/hs/stacks/components/blocks/hooks/useSetCenter'

const viewOnlyProps = {
  deleteKeyCode: undefined
}

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
  const interactiveProps = viewOnly ? viewOnlyProps : {}
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
      {...interactiveProps}
    >
      <Background color={backgroundColor} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
