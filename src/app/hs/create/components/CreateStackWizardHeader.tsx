import { useWizard } from 'react-use-wizard'
import { Progress } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { LucideArrowLeft, LucideArrowRight } from 'lucide-react'
import React from 'react'

export function CreateStackWizardHeader() {
  const { activeStep, stepCount, previousStep, nextStep } = useWizard()
  const progress = (activeStep - 1 / stepCount) * 100
  return (
    <div className="flex items-center gap-8">
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          track: 'drop-shadow-md border border-default',
          indicator: 'bg-gradient-to-r from-yellow-400 to-red-400',
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
            startContent={<LucideArrowLeft />}
          >
            Previous
          </Button>
        )}
        {activeStep < stepCount - 1 && (
          <Button
            color="primary"
            variant="solid"
            onClick={nextStep}
            endContent={<LucideArrowRight />}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
