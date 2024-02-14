import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea } from '@nextui-org/input'
import React from 'react'
import { z } from 'zod'
import SubmitButton from '@/app/hs/stacks/components/suggestions/SubmitButton'
import { Select, SelectItem, SelectSection } from '@nextui-org/react'
import { useAction, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import Image from 'next/image'
import { Id } from '~/convex/_generated/dataModel'
import { toast } from 'sonner'
import { convertFileToBase64 } from '@/app/lib/utils'

const techFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must contain at least 3 characters')
    .max(50, 'Category name must contain at most 50 characters'),
  description: z.string(),
  blockId: z.string(),
  logo: z.custom<File>(),
  githubUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal(''))
})

type TechFormState = z.infer<typeof techFormSchema>

export function TechForm() {
  const { control, handleSubmit, reset } = useForm<TechFormState>({
    resolver: zodResolver(techFormSchema),
    defaultValues: {
      name: '',
      description: '',
      blockId: '',
      logo: undefined,
      githubUrl: '',
      websiteUrl: ''
    }
  })
  const saveTechSuggestion = useAction(api.suggestions.saveSuggestion)

  const blocksData = useQuery(api.blocks.blocksByCategories, {})
  const [preview, setPreview] = React.useState<string | undefined>(undefined)
  const onSubmit: SubmitHandler<TechFormState> = async ({
    name,
    description,
    blockId,
    logo,
    githubUrl,
    websiteUrl
  }) => {
    try {
      const logoBase64 = await convertFileToBase64(logo)
      await saveTechSuggestion({
        name,
        type: 'tech',
        blockId: blockId as Id<'blocks'>,
        description,
        logo: logoBase64,
        githubUrl,
        websiteUrl
      })
      reset()
      toast.success('Tech suggestion saved, thank you!', {
        description:
          'We will review your suggestion and add it to the list if it fits the criteria.'
      })
    } catch (error) {
      console.error('Error saving tech suggestion', error)
      toast.error('Error saving tech suggestion')
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
            label="Tech name"
            labelPlacement="outside"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            description="Technologies are the most basic unit in your stack. they belong to a block and can be used in multiple projects. They can be a programming language, a framework, a library, or a tool."
          />
        )}
      />
      <Controller
        name="blockId"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            isRequired
            variant="bordered"
            label="Block"
            labelPlacement="outside"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            isLoading={!blocksData}
            description="Which block does this tech belong to? missing a block? suggest it!"
          >
            {(blocksData ?? []).map(({ category, blocks }) => (
              <SelectSection
                key={category._id}
                showDivider
                title={category.name}
              >
                {blocks.map((block) => (
                  <SelectItem
                    key={block._id}
                    value={block._id}
                    textValue={`${category.name} > ${block.name}`}
                  >
                    {block.name}
                    <span className="ml-2 text-xs text-default-400">
                      ({block.tags.join(', ')})
                    </span>
                  </SelectItem>
                ))}
              </SelectSection>
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
            placeholder="For example: The web framework for content-driven websites"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            variant="bordered"
            maxLength={500}
            description="Describe your tech, what it does, what it's used for, use the description from the GitHub repo when possible."
          />
        )}
      />
      <Controller
        name="githubUrl"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            label="GitHub URL"
            labelPlacement="outside"
            variant="bordered"
          />
        )}
      />

      <Controller
        name="websiteUrl"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            label="Website"
            labelPlacement="outside"
            variant="bordered"
          />
        )}
      />
      <div className="flex flex-col space-y-4">
        <label className="text-small">Tech logo</label>
        <p className="text-xs text-default-400">
          Strongly prefer svg format, png is also accepted.
        </p>
        <Controller
          name="logo"
          control={control}
          render={({ field, fieldState }) => (
            <input
              accept="image/svg+xml, image/png"
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0]
                field.onChange(file)
                file && setPreview(URL.createObjectURL(file))
              }}
            />
          )}
        />

        <div className="p-4 w-[80px] border border-dashed border-default-300 rounded-medium text-small text-center">
          {preview ? (
            <Image alt="tech logo" src={preview} width={50} height={50} />
          ) : (
            <span>Logo preview</span>
          )}
        </div>
      </div>

      <SubmitButton />
    </form>
  )
}
