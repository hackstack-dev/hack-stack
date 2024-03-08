import React from 'react'
import { StackStateProps } from '@/app/hs/stacks/create/create.types'
import { useWizard } from 'react-use-wizard'
import { Node, Edge } from 'reactflow'
import StackBlocks from '@/app/hs/stacks/components/blocks/StackBlocks'
import useBlockNodes from '@/app/hs/stacks/components/blocks/hooks/useBlockNodes'
import { CreateStacksBlocksHeader } from '@/app/hs/stacks/create/components/steps/create-blocks/CreateStacksBlocksHeader'

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
