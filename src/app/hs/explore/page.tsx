import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import ExploreDashboard from '@/app/hs/explore/dashboard/ExploreDashboard'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import {LucideListPlus} from 'lucide-react'
import React from 'react'

export default function ExplorePage() {
  return (
    <ContentContainer>
      <ActionableHeader
        title=""
        action={
          <Button color="primary" as={Link} href="stacks/create">
            <LucideListPlus /> Create new Stack
          </Button>
        }
      />
      <ExploreDashboard />
    </ContentContainer>
  )
}
