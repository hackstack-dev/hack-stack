import React from 'react'
import type { StackStateProps } from '@/app/hs/stacks/create/create.types'
import { useWizard } from 'react-use-wizard'
import type { Node, Edge } from 'reactflow'
import StackBlocks from '@/app/hs/stacks/components/blocks/StackBlocks'
import { CreateStacksBlocksHeader } from '@/app/hs/stacks/create/components/steps/create-blocks/CreateStacksBlocksHeader'
import useBlockNodes from '@/app/hs/components/ui/FlowEditor/hooks/useBlockNodes'

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

export default function CreateStackBlocks({
  stackState,
  onStateChange
}: StackStateProps) {
  const { handleStep } = useWizard()
  const { getNodes, getEdges, validateBlocks, error } = useBlockNodes()
  handleStep(async () => {
    await validateBlocks()
    onStateChange({
      stackBlocks: getNodes(),
      stackEdges: getEdges()
    })
  })

  return (
    <>
      <CreateStacksBlocksHeader stackState={stackState} error={error} />
      <StackBlocks
        initialNodes={stackState.stackBlocks ?? initialNodes}
        initialEdges={stackState.stackEdges ?? initialEdges}
      />
    </>
  )
}
