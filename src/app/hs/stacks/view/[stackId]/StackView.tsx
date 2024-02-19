'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { Node, useNodesState } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Spinner } from '@nextui-org/react'
import StackViewHeader from '@/app/hs/stacks/view/[stackId]/StackViewHeader'
import StackViewBlocks from '@/app/hs/stacks/view/[stackId]/StackViewBlocks'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'

interface StackViewProps {
  stackId: Id<'stacks'>
}
export default function StackView({ stackId }: StackViewProps) {
  const { isAuthenticated } = useConvexAuth()
  const shouldFetch = isAuthenticated && stackId
  const stack = useQuery(
    api.stack.getPublicStack,
    shouldFetch ? { stackId } : 'skip'
  )
  const [nodes, setNodes, onNodesChange] = useNodesState([])

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
    }
  }, [stack, setNodes])

  return (
    <>
      {!stack && <PageDataLoading />}
      {stack && (
        <div className="flex flex-col h-[calc(100vh-70px)]">
          <StackViewHeader stack={stack} />
          <StackViewBlocks
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            userId={stack.userId}
            stackId={stackId}
          />
        </div>
      )}
    </>
  )
}
