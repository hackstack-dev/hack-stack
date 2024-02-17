import React from 'react'
import Flow from '@/app/hs/stacks/components/blocks/Flow'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ResizeHandle from '@/app/hs/stacks/components/blocks/ResizeHandle'
import { Node, OnNodesChange } from 'reactflow'
import StackViewTechDetails from '@/app/hs/stacks/view/[stackId]/StackViewTechDetails'
import UserProfileLink from '@/app/hs/components/ui/UserProfileLink'
import Likes from '@/app/hs/stacks/components/Likes'
import { Id } from '~/convex/_generated/dataModel'

interface StackViewBlocksProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  onNodesChange: OnNodesChange
  userId?: Id<'users'>
  stackId?: Id<'stacks'>
}
export default function StackViewBlocks({
  nodes,
  setNodes,
  onNodesChange,
  userId,
  stackId
}: StackViewBlocksProps) {
  return (
    <div className="grow border-1 rounded dark:border-default-50">
      <PanelGroup direction="horizontal">
        <Panel minSize={70}>
          <section className="h-full w-full relative">
            {userId && stackId && (
              <div className="absolute top-4 left-4 z-10">
                <div className="p-2 bg-default-50/80 rounded-medium flex flex-col items-center gap-2">
                  <UserProfileLink userId={userId} withName />
                  <Likes stackId={stackId} />
                </div>
              </div>
            )}
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
