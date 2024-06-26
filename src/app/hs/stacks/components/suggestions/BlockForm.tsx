import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea } from '@nextui-org/input'
import React from 'react'
import { z } from 'zod'
import SubmitButton from '@/app/hs/stacks/components/suggestions/SubmitButton'
import { useAction, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { ScrollShadow, Select, SelectItem } from '@nextui-org/react'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { Chip } from '@nextui-org/chip'
import { toast } from 'sonner'
import { Id } from '~/convex/_generated/dataModel'
import {
  commonToastOptions,
  getErrorText,
  getSuccessText
} from '@/app/hs/stacks/components/suggestions/Suggestion.utils'

const blockFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Block name must contain at least 3 characters')
    .max(50, 'Block name must contain at most 50 characters'),
  category: z.string(),
  description: z
    .string()
    .min(20, 'Block description must contain at least 20 characters')
    .max(500, 'Block description must contain at most 500 characters'),
  tags: z
    .array(z.string())
    .min(1, 'At least one tag is required')
    .max(5, 'At most 5 tags are allowed')
})

type BlockFormState = z.infer<typeof blockFormSchema>

export function BlockForm() {
  const [submitting, setSubmitting] = React.useState(false)

  const saveBlockSuggestion = useAction(api.suggestions.saveSuggestion)

  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<BlockFormState>({
      resolver: zodResolver(blockFormSchema),
      defaultValues: {
        name: '',
        category: '',
        description: '',
        tags: []
      }
    })

  const [tagsInputValue, setTagsInputValue] = React.useState('')
  const categories = useQuery(api.categories.getCategories, {})

  const onSubmit: SubmitHandler<BlockFormState> = async ({
    name,
    category,
    description,
    tags
  }) => {
    setSubmitting(true)
    try {
      await saveBlockSuggestion({
        name,
        approved: false,
        type: 'block',
        category: category as Id<'categories'>,
        description,
        tags
      })
      reset()
      const successText = getSuccessText('Block')
      toast.success(successText.message, {
        description: successText.description,
        ...commonToastOptions
      })
    } catch (error) {
      const errorText = getErrorText('block')
      console.error(errorText.message, error)
      toast.error(errorText.message, {
        description: errorText.description,
        ...commonToastOptions
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const newTag = event.currentTarget.value
      const currentTags = getValues('tags')
      if (newTag && !currentTags.includes(newTag) && currentTags.length < 5) {
        setValue('tags', [...currentTags, newTag])
        setTagsInputValue('')
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            isRequired
            variant="bordered"
            label="Block name"
            labelPlacement="outside"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            description="Blocks used to group similar technologies together. For example, Frontend Framework will group 'React', 'Vue', 'Angular', etc."
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            isRequired
            variant="bordered"
            label="Category"
            labelPlacement="outside"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            isLoading={!categories}
            description="Which category does this block belong to? missing a category? suggest it!"
          >
            {(categories ?? []).map((category) => (
              <SelectItem key={category._id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            isRequired
            label="Description"
            labelPlacement="outside"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            variant="bordered"
            maxLength={500}
            description="Describe the block in detail. What technologies does it include? What is the purpose of this block?"
          />
        )}
      />
      <ScrollShadow className="max-h-[300px]">
        <Controller
          name="tags"
          control={control}
          render={({ field, fieldState }) => (
            <Listbox
              topContent={
                <Input
                  variant="bordered"
                  size="sm"
                  placeholder="Insert tag"
                  value={tagsInputValue}
                  onValueChange={(value) => setTagsInputValue(value)}
                  onKeyDown={handleAddTag}
                />
              }
              aria-label="Tags"
              variant="light"
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={field.value}
              onSelectionChange={(keys) =>
                field.onChange(Array.from(keys) as string[])
              }
              classNames={{
                list: 'max-h-[300px] overflow-scroll'
              }}
            >
              {field.value.map((tag) => (
                <ListboxItem key={tag}>
                  <Chip key={tag} size="sm" color="primary" variant="flat">
                    {tag}
                  </Chip>
                </ListboxItem>
              ))}
            </Listbox>
          )}
        />
        <p className="text-xs text-default-400">
          Name between 1 and 5 popular technologies that belong to this block
        </p>
      </ScrollShadow>
      <SubmitButton submitting={submitting} />
    </form>
  )
}
