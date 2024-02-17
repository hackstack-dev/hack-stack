import { Node, useNodesState } from 'reactflow'
import useNewBlockPosition from '@/app/hs/stacks/components/blocks/hooks/useNewBlockPosition'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { NewBlockDialog } from '@/app/hs/stacks/components/blocks/library/NewBlockDialog'
import Flow from '@/app/hs/stacks/components/blocks/Flow'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import TemplateBlockTechList from '@/app/hs/templates/components/TemplateBlockTechList'

interface TemplateBlocksProps {
  initialNodes: Node<BlockNodeData, string | undefined>[]
}

export default function TemplateBlocks({ initialNodes }: TemplateBlocksProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
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
      <NewBlockDialog onAddBlock={handleAddBlock} />
      <TemplateBlockTechList />
      <Flow nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} />
    </>
  )
}
