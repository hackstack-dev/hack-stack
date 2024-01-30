'use client'

import { Wizard, useWizard } from 'react-use-wizard'
import TemplateListSelection from '@/app/hs/create/components/TemplateListSelection'
import StackDetails from '@/app/hs/create/components/StackDetails'
import Step3 from '@/app/hs/create/components/Step3'
import React from 'react'
import { CreateStackWizardHeader } from '@/app/hs/create/components/CreateStackWizardHeader'
import { StackForm, StackState } from '@/app/hs/create/create.types'

export default function CreateStackWizard() {
  const [createStackState, setStackState] = React.useState<StackState>({
    name: '',
    projectTypes: [],
    sourceCodeUrl: '',
    websiteUrl: '',
    description: '',
    templateId: ''
  })

  const handleStackStateChange = React.useCallback(
    (newState: Partial<StackState>) => {
      setStackState((prev) => ({ ...prev, ...newState }))
    },
    []
  )

  return (
    <div className="container mx-auto">
      <Wizard
        startIndex={0}
        header={<CreateStackWizardHeader />}
        footer={
          <pre className="text-sm">
            <code>{JSON.stringify(createStackState, null, 2)}</code>
          </pre>
        }
      >
        <StackDetails
          stackState={createStackState}
          onStateChange={handleStackStateChange}
        />
        <TemplateListSelection
          stackState={createStackState}
          onStateChange={handleStackStateChange}
        />
        <Step3 />
      </Wizard>
    </div>
  )
}
