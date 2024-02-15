import React from 'react'
import { StackState } from '@/app/hs/stacks/create/create.types'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { useWizard } from 'react-use-wizard'
import { Suggestion } from '@/app/hs/stacks/components/suggestions/Suggestion'

interface StacksBlocksHeaderProps {
  stackState: StackState
  error: string
}
export function CreateStacksBlocksHeader({
  stackState,
  error
}: StacksBlocksHeaderProps) {
  const { goToStep, previousStep } = useWizard()
  return (
    <div className="py-4 flex items-center justify-between">
      <Breadcrumbs>
        <BreadcrumbItem>
          <span onClick={() => goToStep(0)}>{stackState.name}</span>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span onClick={previousStep}>{stackState.template?.name}</span>
        </BreadcrumbItem>
        <BreadcrumbItem>Build your stack</BreadcrumbItem>
      </Breadcrumbs>
      {error && <p className="text-small text-danger pr-2">{error}</p>}
      <Suggestion item="tech" />
    </div>
  )
}
