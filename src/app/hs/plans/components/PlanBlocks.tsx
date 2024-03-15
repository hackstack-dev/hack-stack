import { type Node, type Edge, useNodesState, useEdgesState } from 'reactflow'
import type { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import React from 'react'
import BlocksToolbar from '@/app/hs/components/ui/FlowEditor/BlocksToolbar'
import PlanQnAForm from '@/app/hs/plans/create/project/PlanQnAForm'
import useNewBlockPosition from '@/app/hs/components/ui/FlowEditor/hooks/useNewBlockPosition'
import Flow from '@/app/hs/components/ui/FlowEditor/Flow'

interface TemplateBlocksProps {
  initialNodes: Node[]
  initialEdges: Edge[]
}

export default function PlanBlocks({
  initialNodes,
  initialEdges
}: TemplateBlocksProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { setPosition } = useNewBlockPosition()
  const handleAddBlock = (nodeData: BlockNodeData) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((node) =>
        node.selected ? { ...node, selected: false } : node
      )

      const newBlockNode = {
        id: `${nodeData.id}_${updatedNodes.length}`,
        type: 'blockNode',
        data: nodeData,
        position: setPosition(),
        selected: true
      }
      return [...updatedNodes, newBlockNode]
    })
  }
  return (
    <>
      <BlocksToolbar viewOnly />
      <Flow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
      />
    </>
  )
}
