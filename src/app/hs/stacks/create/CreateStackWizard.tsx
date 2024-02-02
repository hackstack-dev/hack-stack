'use client'

import { Wizard } from 'react-use-wizard'
import TemplateListSelection from '@/app/hs/stacks/create/components/steps/TemplateListSelection'
import StackDetails from '@/app/hs/stacks/create/components/steps/StackDetails'
import React from 'react'
import { CreateStackWizardHeader } from '@/app/hs/stacks/create/components/layout/CreateStackWizardHeader'
import { StackState } from '@/app/hs/stacks/create/create.types'
import StackBlocks from '@/app/hs/stacks/create/components/steps/blocks/StackBlocks'
import { StepContainer } from '@/app/hs/stacks/create/components/layout/StepContainer'
import { Doc } from '~/convex/_generated/dataModel'
import { ReactFlowProvider } from 'reactflow'

export default function CreateStackWizard() {
  const [createStackState, setStackState] = React.useState<StackState>({
    name: '',
    projectTypes: [],
    sourceCodeUrl: '',
    websiteUrl: '',
    description: '',
    template: {} as Doc<'templates'>
  })

  const handleStackStateChange = React.useCallback(
    (newState: Partial<StackState>) => {
      setStackState((prev) => ({ ...prev, ...newState }))
    },
    []
  )

  return (
    <Wizard startIndex={0} header={<CreateStackWizardHeader />}>
      <StepContainer>
        <StackDetails
          stackState={createStackState}
          onStateChange={handleStackStateChange}
        />
      </StepContainer>
      <StepContainer>
        <TemplateListSelection
          stackState={createStackState}
          onStateChange={handleStackStateChange}
        />
      </StepContainer>
      <ReactFlowProvider>
        <StackBlocks
          stackState={createStackState}
          onStateChange={handleStackStateChange}
        />
      </ReactFlowProvider>
      <div>Finish</div>
    </Wizard>
  )
}
