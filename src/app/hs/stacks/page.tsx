import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import StackList from '@/app/hs/stacks/list/StackList'
import { LucideListPlus } from 'lucide-react'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'

export default function StacksPage() {
  return (
    <ContentContainer>
      <ActionableHeader
        title="Your stacks"
        action={
          <Button
            color="primary"
            as={Link}
            href="stacks/create"
            className="text-white"
          >
            <LucideListPlus strokeWidth={1.5} /> Create new Stack
          </Button>
        }
      />
      <div className="my-8">
        <StackList />
      </div>
    </ContentContainer>
  )
}
