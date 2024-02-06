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
import Summary from '@/app/hs/stacks/create/components/steps/Summary'
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { getRandomCardBackground } from '@/app/lib/utils'

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
    const templateId = template._id
    const coverImage = getRandomCardBackground()
    // const stack: Stack = { ...rest, templateId }
    await saveStack({ stack: { ...rest, templateId, coverImage } })
    router.push('/hs/stacks')
  }

  return (
    <Wizard
      startIndex={0}
      header={<CreateStackWizardHeader onSaveStack={handleSaveStack} />}
    >
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
      <StepContainer>
        <Summary stackState={createStackState} />
      </StepContainer>
    </Wizard>
  )
}
