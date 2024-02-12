import { useWizard } from 'react-use-wizard'
import { Progress } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { LucideArrowLeft, LucideArrowRight } from 'lucide-react'
import React from 'react'

interface CreateStackWizardHeaderProps {
  onSaveStack: () => void
}
export function CreateStackWizardHeader({
  onSaveStack
}: CreateStackWizardHeaderProps) {
  const { activeStep, stepCount, previousStep, nextStep } = useWizard()
  const currentStep = activeStep + 1
  const progress = (currentStep / stepCount) * 100
  return (
    <div className="flex items-center gap-8">
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          track: 'dark:drop-shadow-md border border-default',
          indicator: 'bg-black dark:bg-gradient-to-r from-secondary to-primary',
          label: 'tracking-wider font-medium text-default-600',
          value: 'text-foreground/60'
        }}
        label="Create a new stack"
        value={progress}
        showValueLabel={true}
      />
      <div className="flex items-center gap-4">
        {activeStep > 0 && (
          <Button
            variant="flat"
            onClick={previousStep}
            startContent={<LucideArrowLeft strokeWidth={1} />}
          >
            Previous
          </Button>
        )}
        {activeStep < stepCount - 1 && (
          <Button
            variant="solid"
            onClick={nextStep}
            endContent={<LucideArrowRight strokeWidth={1} />}
          >
            Next
          </Button>
        )}
        {activeStep === stepCount - 1 && (
          <Button variant="solid" color="primary" onClick={onSaveStack}>
            Save stack
          </Button>
        )}
      </div>
    </div>
  )
}
