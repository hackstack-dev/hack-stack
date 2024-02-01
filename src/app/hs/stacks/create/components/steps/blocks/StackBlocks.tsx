import React from 'react'
import { StackStateProps } from '@/app/hs/stacks/create/create.types'
import { useWizard } from 'react-use-wizard'
import { ReactFlowProvider } from 'reactflow'
import Flow from '@/app/hs/stacks/create/components/steps/blocks/Flow'
import { Node } from 'reactflow'
import './StackBlocks.css'
import { StacksBlocksHeader } from '@/app/hs/stacks/create/components/steps/blocks/StacksBlocksHeader'
import { NewBlockDialog } from '@/app/hs/stacks/create/components/steps/blocks/NewBlockDialog'
import Drawer from '@/app/hs/components/ui/drawer/Drawer'

const initialNodes: Node[] = []
for (let i = 0; i < 9; ++i) {
  const row = Math.floor(i / 3) // Calculate the row
  const col = i % 3 // Calculate the column

  initialNodes.push({
    id: `${i}`,
    data: { label: `Node ${i}` },
    position: { x: col * 250, y: row * 150 },
    style: {
      width: 200,
      height: 100
    }
  })
}

console.log(initialNodes)
export default function StackBlocks({
  stackState,
  onStateChange
}: StackStateProps) {
  const { handleStep } = useWizard()
  const [isOpen, setIsOpen] = React.useState(false)

  // const { isAuthenticated } = useConvexAuth()

  handleStep(async () => {})

  return (
    <>
      <StacksBlocksHeader stackState={stackState} />
      <ReactFlowProvider>
        <section className="h-[calc(100vh-202px)] w-full relative">
          <NewBlockDialog />
          <Flow nodes={initialNodes} edges={[]} />
          <Drawer isOpen={isOpen} onOpenChange={setIsOpen} />
        </section>
      </ReactFlowProvider>
    </>
  )
}
