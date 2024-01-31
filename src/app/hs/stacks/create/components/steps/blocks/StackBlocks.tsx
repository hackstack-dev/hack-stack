import React from 'react'
import { StackStateProps } from '@/app/hs/stacks/create/create.types'
import { useWizard } from 'react-use-wizard'
import { ReactFlowProvider } from 'reactflow'
import Flow from '@/app/hs/plan/components/Flow'
import { Node } from 'reactflow'
import './StackBlocks.css'
import { StacksBlocksHeader } from '@/app/hs/stacks/create/components/steps/blocks/StacksBlocksHeader'

const initialNodes: Node[] = []
for (let i = 0; i < 10; ++i) {
  initialNodes.push({
    id: `${i}`,
    data: { label: `Node ${i}` },
    position: { x: i * 200, y: i * 100 },
    style: {
      width: 200,
      height: 100
    }
  })
}

export default function StackBlocks({
  stackState,
  onStateChange
}: StackStateProps) {
  const { handleStep } = useWizard()
  // const { isAuthenticated } = useConvexAuth()

  handleStep(async () => {})

  return (
    <>
      <StacksBlocksHeader stackState={stackState} />
      <ReactFlowProvider>
        <section className="h-[calc(100vh-202px)] w-full">
          <Flow nodes={initialNodes} edges={[]} />
        </section>
      </ReactFlowProvider>
    </>
  )
}
