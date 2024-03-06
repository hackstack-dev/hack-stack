import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import StackView from '@/app/hs/stacks/view/[stackId]/StackView'
import FlowProvider from '@/app/hs/components/ui/FlowProvider'

interface StackPageProps {
  params: { stackId: Id<'stacks'> }
  searchParams: {
    feedback?: string
  }
}
export default function StackPage({ params, searchParams }: StackPageProps) {
  const stackId = params.stackId
  const openFeedbacks = searchParams.feedback
  return (
    <FlowProvider>
      <StackView stackId={stackId} openFeedbacks={openFeedbacks} />
    </FlowProvider>
  )
}
