import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import StackViewProvider from '@/app/hs/stacks/components/StackViewProvider'
import StackView from '@/app/hs/stacks/view/[stackId]/StackView'

export default function StackPage({
  params
}: { params: { stackId: Id<'stacks'> } }) {
  const stackId = params.stackId

  return (
    <ContentContainer>
      <StackViewProvider>
        <StackView stackId={stackId} />
      </StackViewProvider>
    </ContentContainer>
  )
}
