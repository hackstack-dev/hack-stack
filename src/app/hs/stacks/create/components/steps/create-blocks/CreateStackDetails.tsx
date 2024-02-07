import React from 'react'
import { useForm } from 'react-hook-form'
import {
  StackForm,
  stackFormSchema,
  StackStateProps
} from '@/app/hs/stacks/create/create.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWizard } from 'react-use-wizard'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'
import StackDetailsForm from '@/app/hs/stacks/components/StackDetailsForm'

export default function CreateStackDetails({
  stackState,
  onStateChange
}: StackStateProps) {
  const { handleStep } = useWizard()

  const form = useForm<StackForm>({
    resolver: zodResolver(stackFormSchema),
    defaultValues: stackState
  })

  handleStep(async () => {
    const isValid = await form.trigger()
    if (isValid) {
      onStateChange(form.getValues())
      // return Promise.resolve()
    } else {
      return Promise.reject('Invalid form')
    }
  })

  return (
    <div className="my-12">
      <FancyStepTitle>Let's start with the basics</FancyStepTitle>
      <StackDetailsForm form={form} />
    </div>
  )
}
