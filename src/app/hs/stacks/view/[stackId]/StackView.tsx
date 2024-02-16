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
      // make last block selected
      setNodes(
        stack.stackBlocks.map((block, index, items) => {
          if (index === items.length - 1) {
            return { ...block, selected: true }
          }
          return block
        }) as Node<BlockNodeData>[]
      )
    }
  }, [stack, setNodes])

  return (
    <>
      {!stack && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {stack && (
        <div className="flex flex-col h-[calc(100vh-108px)]">
          <StackViewHeader stack={stack} />
          <StackViewBlocks
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
          />
        </div>
      )}
    </>
  )
}
