import React from 'react'
import { StackStateProps } from '@/app/hs/stacks/create/create.types'
import { useWizard } from 'react-use-wizard'
import { useNodesState } from 'reactflow'
import Flow from '@/app/hs/stacks/create/components/steps/blocks/Flow'
import { Node } from 'reactflow'
import { StacksBlocksHeader } from '@/app/hs/stacks/create/components/steps/blocks/StacksBlocksHeader'
import { NewBlockDialog } from '@/app/hs/stacks/create/components/steps/blocks/library/NewBlockDialog'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ResizeHandle from '@/app/hs/stacks/create/components/steps/blocks/ResizeHandle'
import BlockDataPanel from '@/app/hs/stacks/create/components/steps/blocks/BlockDataPanel'
import { BlockNodeData } from '@/app/hs/stacks/create/components/steps/blocks/Blocks.types'
import useNewBlockPosition from '@/app/hs/stacks/create/components/steps/blocks/hooks/useNewBlockPosition'

const initialNodes: Node[] = []

export default function StackBlocks({
  stackState,
  onStateChange
}: StackStateProps) {
  const { handleStep } = useWizard()
  const { setPosition } = useNewBlockPosition()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  const handleAddBlock = (nodeData: BlockNodeData) => {
    setNodes((prev) => [
      ...prev,
      {
        id: `${nodeData.id}_${prev.length}`,
        type: 'blockNode',
        data: nodeData,
        position: setPosition()
      }
    ])
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

  handleStep(async () => {})

  return (
    <div className="border-b-1 dark:border-default-100">
      <StacksBlocksHeader stackState={stackState} />
      <PanelGroup direction="horizontal">
        <Panel minSize={70}>
          <section className="h-[calc(100vh-175px)] w-full relative">
            <NewBlockDialog onAddBlock={handleAddBlock} />
            <Flow
              nodes={nodes}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
            />
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
