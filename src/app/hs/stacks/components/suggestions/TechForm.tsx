import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import React from 'react'
import { z } from 'zod'
import SubmitButton from '@/app/hs/stacks/components/suggestions/SubmitButton'

const techFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must contain at least 3 characters')
    .max(50, 'Category name must contain at most 50 characters')
})

type TechFormState = z.infer<typeof techFormSchema>

export function TechForm() {
  const { control, handleSubmit } = useForm<TechFormState>({
    resolver: zodResolver(techFormSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit: SubmitHandler<TechFormState> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            variant="bordered"
            label="Category name"
            labelPlacement="outside"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            description="Categories are used to group similar blocks together. For example, 'Frontend', 'Backend', 'Database', etc."
          />
        )}
      />
      <SubmitButton />
    </form>
  )
}
