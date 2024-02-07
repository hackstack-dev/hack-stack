'use client'

import { Wizard } from 'react-use-wizard'
import TemplateListSelection from '@/app/hs/stacks/create/components/steps/TemplateListSelection'
import CreateStackDetails from '@/app/hs/stacks/create/components/steps/create-blocks/CreateStackDetails'
import React from 'react'
import { CreateStackWizardHeader } from '@/app/hs/stacks/create/components/layout/CreateStackWizardHeader'
import { StackState } from '@/app/hs/stacks/create/create.types'
import StackBlocks from '@/app/hs/stacks/components/blocks/StackBlocks'
import { StepContainer } from '@/app/hs/stacks/create/components/layout/StepContainer'
import { Doc } from '~/convex/_generated/dataModel'
import { ReactFlowProvider } from 'reactflow'
import Summary from '@/app/hs/stacks/create/components/steps/Summary'
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { getRandomBackground } from '@/app/lib/utils'
import CreateStackBlocks from '@/app/hs/stacks/create/components/steps/create-blocks/CreateStackBlocks'

export default function CreateStackWizard() {
  const router = useRouter()
  const [createStackState, setStackState] = React.useState<StackState>({
    name: '',
    projectTypes: [],
    sourceCodeUrl: '',
    websiteUrl: '',
    description: '',
    template: {} as Doc<'templates'>,
    stackBlocks: []
  })

  const saveStack = useMutation(api.stack.saveStack)

  const handleStackStateChange = React.useCallback(
    (newState: Partial<StackState>) => {
      setStackState((prev) => ({ ...prev, ...newState }))
    },
    []
  )

  const handleSaveStack = async () => {
    // save stack
    const { template, ...rest } = createStackState
    const templateId = template?._id ?? ''
    const coverImage = getRandomBackground()
    await saveStack({ stack: { ...rest, templateId, coverImage } })
    router.push('/hs/stacks')
  }

  return (
    <Wizard
      startIndex={0}
      header={<CreateStackWizardHeader onSaveStack={handleSaveStack} />}
    >
      <StepContainer>
        <CreateStackDetails
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
        <CreateStackBlocks
          stackState={createStackState}
          onStateChange={handleStackStateChange}
        />
      </ReactFlowProvider>
      <StepContainer>
        <Summary stackState={createStackState} />
      </StepContainer>
    </Wizard>
  )
}
