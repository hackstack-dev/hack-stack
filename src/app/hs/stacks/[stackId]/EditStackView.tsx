'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { StackState } from '@/app/hs/stacks/create/create.types'
import type { Node } from 'reactflow'
import {
  BlockNodeData,
  BlocksConfig
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import EditStack from '@/app/hs/stacks/[stackId]/EditStack'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import useBlocksConfig from '@/app/hs/stacks/components/blocks/hooks/useBlocksConfig'

interface StackViewProps {
  stackId: Id<'stacks'>
}
export default function EditStackView({ stackId }: StackViewProps) {
  const { isAuthenticated } = useConvexAuth()
  const shouldFetch = isAuthenticated && stackId
  const stack = useQuery(
    api.stack.getUserStack,
    shouldFetch ? { stackId } : 'skip'
  )
  const { setBlocksConfig } = useBlocksConfig()
  const [editStackState, setStackState] = React.useState<StackState>({
    name: '',
    projectTypes: [],
    sourceCodeUrl: '',
    websiteUrl: '',
    description: '',
    stackBlocks: [],
    stackEdges: [],
    isPublic: true,
    coverImage: ''
  })

  React.useEffect(() => {
    if (stack) {
      setStackState({
        name: stack.name,
        projectTypes: stack.projectTypes,
        sourceCodeUrl: stack.sourceCodeUrl,
        websiteUrl: stack.websiteUrl,
        description: stack.description,
        stackBlocks: stack.stackBlocks as Node<BlockNodeData>[],
        stackEdges: stack.stackEdges,
        isPublic: stack.isPublic,
        coverImage: stack.coverImage
      })
      stack?.blocksConfig && setBlocksConfig(stack.blocksConfig as BlocksConfig)
    }
  }, [stack, setBlocksConfig])

  return (
    <>
      {!editStackState.name && <PageDataLoading />}
      {editStackState.name && stack && (
        <EditStack
          stackId={stackId}
          stack={stack}
          stackState={editStackState}
        />
      )}
    </>
  )
}
