import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import EditStackView from '@/app/hs/stacks/[stackId]/EditStackView'
import StackViewProvider from '@/app/hs/stacks/components/StackViewProvider'

export default function StackPage({
  params
}: { params: { stackId: Id<'stacks'> } }) {
  const stackId = params.stackId

  return (
    <ContentContainer>
      <StackViewProvider>
        <EditStackView stackId={stackId} />
      </StackViewProvider>
    </ContentContainer>
  )
}