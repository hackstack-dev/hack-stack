import React from 'react'
import Flow from '@/app/hs/stacks/components/blocks/Flow'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ResizeHandle from '@/app/hs/stacks/components/blocks/ResizeHandle'
import { Node, OnNodesChange } from 'reactflow'
import StackViewTechDetails from '@/app/hs/stacks/view/[stackId]/StackViewTechDetails'

interface StackViewBlocksProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  onNodesChange: OnNodesChange
}
export default function StackViewBlocks({
  nodes,
  setNodes,
  onNodesChange
}: StackViewBlocksProps) {
  return (
    <div className="grow border-1 rounded dark:border-default-50">
      <PanelGroup direction="horizontal">
        <Panel minSize={70}>
          <section className="h-full w-full relative">
            <Flow
              nodes={nodes}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              viewOnly
            />
          </section>
        </Panel>
        <PanelResizeHandle className="relative">
          <ResizeHandle />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={0}>
          <StackViewTechDetails />
        </Panel>
      </PanelGroup>
    </div>
  )
}
