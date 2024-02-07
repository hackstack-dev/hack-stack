import React from 'react'
import { StackState } from '@/app/hs/stacks/create/create.types'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { useWizard } from 'react-use-wizard'

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
    <div className="py-4 flex items-center gap-4 border-b-1 dark:border-default-100">
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
    </div>
  )
}
