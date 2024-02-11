import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import DiscoverDashboard from '@/app/hs/discover/dashboard/DiscoverDashboard'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import {LucideListPlus} from 'lucide-react'
import React from 'react'

export default function DiscoverPage() {
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
      <DiscoverDashboard />
    </ContentContainer>
  )
}
