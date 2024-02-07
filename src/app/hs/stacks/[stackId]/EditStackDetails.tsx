import React from 'react'
import { useForm } from 'react-hook-form'
import {
  StackForm,
  stackFormSchema,
  StackStateProps
} from '@/app/hs/stacks/create/create.types'
import { zodResolver } from '@hookform/resolvers/zod'
import StackDetailsForm from '@/app/hs/stacks/components/StackDetailsForm'

export default function EditStackDetails({
  stackState,
  onStateChange
}: StackStateProps) {
  const form = useForm<StackForm>({
    resolver: zodResolver(stackFormSchema),
    defaultValues: stackState
  })

  return <StackDetailsForm form={form} />
}
