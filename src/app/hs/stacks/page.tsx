import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import CreateStackWizard from '@/app/hs/stacks/create/CreateStackWizard'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

export default function StacksPage() {
  return (
    <ContentContainer>
      <Button color="primary" as={Link} href="stacks/create">Create new Stack</Button>
    </ContentContainer>
  )
}
