import React from 'react'
import { useNodesState } from 'reactflow'
import Flow from '@/app/hs/stacks/components/blocks/Flow'
import { Node } from 'reactflow'
import { NewBlockDialog } from '@/app/hs/stacks/components/blocks/library/NewBlockDialog'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ResizeHandle from '@/app/hs/stacks/components/blocks/ResizeHandle'
import BlockDataPanel from '@/app/hs/stacks/components/blocks/BlockDataPanel'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import useNewBlockPosition from '@/app/hs/stacks/components/blocks/hooks/useNewBlockPosition'
import { cn } from '@/app/lib/utils'
import { Suggestion } from '@/app/hs/stacks/components/suggestions/Suggestion'

interface StackBlocksProps {
  initialNodes: Node<BlockNodeData, string | undefined>[]
  hidden?: boolean
}
export default function StackBlocks({
  initialNodes,
  hidden = false
}: StackBlocksProps) {
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

  const handleUpdateBlock = (
    nodeId: Node['id'],
    blockSelectedTech: BlockNodeData['tech']
  ) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          return { ...node, data: { ...node.data, tech: blockSelectedTech } }
        }
        return node
      })
    )
  }

  return (
    <div
      className={cn(
        'grow border-1 rounded dark:border-default-50',
        hidden && 'hidden'
      )}
    >
      <PanelGroup direction="horizontal">
        <Panel minSize={70}>
          <section className="h-full w-full relative">
            <NewBlockDialog onAddBlock={handleAddBlock} />
            <Flow
              nodes={nodes}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
            />
            <div className="absolute top-6 right-6 z-10">
              <Suggestion item="tech" variant="flat" />
            </div>
          </section>
        </Panel>
        <PanelResizeHandle className="relative">
          <ResizeHandle />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={0}>
          <BlockDataPanel onUpdateBlock={handleUpdateBlock} nodes={nodes} />
        </Panel>
      </PanelGroup>
    </div>
  )
}
