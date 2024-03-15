import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { LucideNotebookPen } from 'lucide-react'
import React from 'react'
import PlanList from '@/app/hs/plans/list/PlanList'

export default function PlansPage() {
  return (
    <ContentContainer>
      <ActionableHeader
        title="Your Plans"
        action={
          <Button
            color="success"
            as={Link}
            href="plans/create"
            className="text-black"
          >
            <LucideNotebookPen strokeWidth={1.5} /> Create new Plan
          </Button>
        }
      />
      <div className="my-8">
        <PlanList />
      </div>
    </ContentContainer>
  )
}
