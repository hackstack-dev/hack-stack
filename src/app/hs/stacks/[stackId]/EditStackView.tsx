'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { StackState } from '@/app/hs/stacks/create/create.types'
import type { Node } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import EditStack from '@/app/hs/stacks/[stackId]/EditStack'
import { Spinner } from '@nextui-org/react'
import PageDataLoading from "@/app/hs/components/ui/PageDataLoading";

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
  const [editStackState, setStackState] = React.useState<StackState>({
    name: '',
    projectTypes: [],
    sourceCodeUrl: '',
    websiteUrl: '',
    description: '',
    stackBlocks: []
  })

  React.useEffect(() => {
    if (stack) {
      setStackState({
        name: stack.name,
        projectTypes: stack.projectTypes,
        sourceCodeUrl: stack.sourceCodeUrl,
        websiteUrl: stack.websiteUrl,
        description: stack.description,
        stackBlocks: stack.stackBlocks as Node<BlockNodeData>[]
      })
    }
  }, [stack])

  return (
    <>
      {!editStackState.name && (
          <PageDataLoading />
      )}
      {editStackState.name && stack && (
        <EditStack stackId={stackId} stack={stack} stackState={editStackState} />
      )}
    </>
  )
}
