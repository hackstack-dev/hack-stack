import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { LucideListPlus } from 'lucide-react'
import StackView from '@/app/hs/stacks/[stackId]/StackView'

export default function StackPage({
  params
}: { params: { stackId: Id<'stacks'> } }) {
  const id = params.stackId

  return (
    <ContentContainer>
      <StackView id={id} />
    </ContentContainer>
  )
}
