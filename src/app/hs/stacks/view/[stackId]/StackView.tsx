'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { Node, useEdgesState, useNodesState } from 'reactflow'
import {
  BlockNodeData,
  BlocksConfig
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import StackViewHeader from '@/app/hs/stacks/view/[stackId]/StackViewHeader'
import StackViewBlocks from '@/app/hs/stacks/view/[stackId]/StackViewBlocks'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import useBlocksConfig from '@/app/hs/stacks/components/blocks/hooks/useBlocksConfig'

interface StackViewProps {
  stackId: Id<'stacks'>
  openFeedbacks?: string
}
export default function StackView({ stackId, openFeedbacks }: StackViewProps) {
  const { isAuthenticated } = useConvexAuth()
  const shouldFetch = isAuthenticated && stackId
  const stack = useQuery(
    api.stack.getPublicStack,
    shouldFetch ? { stackId } : 'skip'
  )
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { setBlocksConfig } = useBlocksConfig()

  React.useEffect(() => {
    if (stack) {
      // make first block selected
      setNodes(
        stack.stackBlocks.map((block, index, items) => {
          if (index === 0 && items.every((item) => !item.selected)) {
            return { ...block, selected: true }
          }
          return block
        }) as Node<BlockNodeData>[]
      )
      if (stack.stackEdges) {
        setEdges(stack.stackEdges)
      }
      if (stack.blocksConfig) {
        setBlocksConfig(stack.blocksConfig as BlocksConfig)
      }
    }
  }, [stack, setNodes, setEdges, setBlocksConfig])

  return (
    <>
      {!stack && <PageDataLoading />}
      {stack && (
        <div className="flex flex-col h-[calc(100vh-70px)]">
          <StackViewHeader stack={stack} />
          <StackViewBlocks
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            userId={stack.userId}
            stackId={stackId}
            isOpenForFeedbacks={stack.isOpenForFeedbacks}
            openFeedbacks={openFeedbacks}
          />
        </div>
      )}
    </>
  )
}
