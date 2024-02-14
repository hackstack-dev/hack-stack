import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import React from 'react'
import { z } from 'zod'
import SubmitButton from '@/app/hs/stacks/components/suggestions/SubmitButton'
import { useAction } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { toast } from 'sonner'

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must contain at least 3 characters')
    .max(50, 'Category name must contain at most 50 characters')
})

type CategoryFormState = z.infer<typeof categoryFormSchema>

export function CategoryForm() {
  const saveCategorySuggestion = useAction(api.suggestions.saveSuggestion)
  const { control, handleSubmit, reset } = useForm<CategoryFormState>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit: SubmitHandler<CategoryFormState> = async ({ name }) => {
    try {
      await saveCategorySuggestion({
        name,
        type: 'category'
      })
      reset()
      toast.success('Category suggestion saved, thank you!', {
        description:
          'We will review your suggestion and add it to the list if it fits the criteria.'
      })
    } catch (error) {
      console.error('Error saving category suggestion', error)
      toast.error('Error saving category suggestion')
    }
  }

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
