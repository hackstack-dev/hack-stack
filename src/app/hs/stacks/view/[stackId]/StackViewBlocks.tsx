import React from 'react'
import Flow from '@/app/hs/stacks/components/blocks/Flow'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ResizeHandle from '@/app/hs/stacks/components/blocks/ResizeHandle'
import { Node, OnNodesChange, Edge, OnEdgesChange } from 'reactflow'
import UserProfileLink from '@/app/hs/components/ui/UserProfileLink'
import Likes from '@/app/hs/stacks/components/Likes'
import { Id } from '~/convex/_generated/dataModel'
import StackViewSidebar from '@/app/hs/stacks/view/[stackId]/StackViewSidebar'
import BlocksToolbar from '@/app/hs/stacks/components/blocks/BlocksToolbar'
import { useSnapshot } from 'valtio'
import { snapToGridEnabled } from '@/app/hs/stacks/components/blocks/Blocks.state'

interface StackViewBlocksProps {
  nodes: Node[]
  onNodesChange: OnNodesChange
  edges: Edge[]
  onEdgesChange: OnEdgesChange
  userId?: Id<'users'>
  stackId?: Id<'stacks'>
  isOpenForFeedbacks?: boolean
  openFeedbacks?: string
}
export default function StackViewBlocks({
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  userId,
  stackId,
  isOpenForFeedbacks,
  openFeedbacks
}: StackViewBlocksProps) {
  const snapToGrid = useSnapshot(snapToGridEnabled)
  return (
    <div className="grow border-1 rounded dark:border-default-50">
      <PanelGroup direction="horizontal">
        <Panel minSize={35} defaultSize={65}>
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
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              snapToGrid={snapToGrid.value}
              viewOnly
            />
            <BlocksToolbar viewOnly  />
          </section>
        </Panel>
        <PanelResizeHandle className="relative">
          <ResizeHandle />
        </PanelResizeHandle>
        <Panel defaultSize={35} minSize={0}>
          <StackViewSidebar
            userId={userId}
            stackId={stackId}
            isOpenForFeedbacks={isOpenForFeedbacks}
            openFeedbacks={openFeedbacks}
          />
        </Panel>
      </PanelGroup>
    </div>
  )
}
