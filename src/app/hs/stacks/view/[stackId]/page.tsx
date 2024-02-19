import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import StackView from '@/app/hs/stacks/view/[stackId]/StackView'
import FlowProvider from '@/app/hs/components/ui/FlowProvider'

export default function StackPage({
  params
}: { params: { stackId: Id<'stacks'> } }) {
  const stackId = params.stackId

  return (
    <FlowProvider>
      <StackView stackId={stackId} />
    </FlowProvider>
  )
}
