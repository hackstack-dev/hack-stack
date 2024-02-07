import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import StackView from '@/app/hs/stacks/[stackId]/StackView'
import StackViewProvider from '@/app/hs/stacks/[stackId]/StackViewProvider'

export default function StackPage({
  params
}: { params: { stackId: Id<'stacks'> } }) {
  const id = params.stackId

  return (
    <ContentContainer>
      <StackViewProvider>
        <StackView id={id} />
      </StackViewProvider>
    </ContentContainer>
  )
}
