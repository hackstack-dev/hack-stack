import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea } from '@nextui-org/input'
import React from 'react'
import { z } from 'zod'
import SubmitButton from '@/app/hs/stacks/components/suggestions/SubmitButton'
import {
  Select,
  type SelectedItems,
  SelectItem,
  SelectSection
} from '@nextui-org/react'
import { useAction, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import Image from 'next/image'
import type { Id } from '~/convex/_generated/dataModel'
import { toast } from 'sonner'
import { convertFileToBase64, TECH_TAGS } from '@/app/lib/utils'
import {
  commonToastOptions,
  getErrorText,
  getSuccessText
} from '@/app/hs/stacks/components/suggestions/Suggestion.utils'
import { Chip } from '@nextui-org/chip'

const techFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Tech name must contain at least 3 characters')
    .max(50, 'Tech name must contain at most 50 characters'),
  description: z
    .string()
    .min(10, 'Tech description must contain at least 10 characters')
    .max(500, 'Tech description must contain at most 500 characters'),
  blockId: z.string(),
  logo: z
    .custom<File>()
    .refine((file) => !!file?.name, 'Tech logo is required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  tags: z.set(z.string()).optional()
})

type TechFormState = z.infer<typeof techFormSchema>

export function TechForm() {
  const [submitting, setSubmitting] = React.useState(false)
  const { control, handleSubmit, getFieldState, reset } =
    useForm<TechFormState>({
      resolver: zodResolver(techFormSchema),
      defaultValues: {
        name: undefined,
        description: undefined,
        blockId: undefined,
        logo: undefined,
        githubUrl: undefined,
        websiteUrl: undefined,
        tags: []
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
    websiteUrl,
    tags
  }) => {
    console.log(tags)
    console.log(Array.from(tags ?? []))
    setSubmitting(true)
    try {
      const logoBase64 = await convertFileToBase64(logo)
      await saveTechSuggestion({
        name,
        type: 'tech',
        approved: false,
        blockId: blockId as Id<'blocks'>,
        description,
        logo: logoBase64,
        githubUrl,
        websiteUrl,
        tags: Array.from(tags ?? [])
      })
      reset()
      setPreview(undefined)
      const successText = getSuccessText('Tech')
      toast.success(successText.message, {
        description: successText.description,
        ...commonToastOptions
      })
    } catch (error) {
      const errorText = getErrorText('tech')
      console.error(errorText.message, error)
      toast.error(errorText.message, {
        description: errorText.description,
        ...commonToastOptions
      })
    } finally {
      setSubmitting(false)
    }
  }

  const logoErrorMessage = getFieldState('logo').error?.message
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
      <div className="grid flex-col space-y-4">
        <label className="text-small after:content-['*'] after:text-danger after:ml-0.5">
          Tech logo
        </label>
        <p className="text-xs text-default-400">
          Strongly prefer svg format, png is also accepted.
        </p>
        <div className="flex items-center space-x-4">
          <div className="p-2 h-[64px] w-[64px] border border-dashed border-default-300 rounded-medium text-small text-center flex flex-col justify-center">
            {preview ? (
              <Image alt="tech logo" src={preview} width={50} height={50} />
            ) : (
              <span className="text-default-400">Logo</span>
            )}
          </div>
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
        </div>
        {logoErrorMessage && (
          <p className="text-tiny text-danger">{logoErrorMessage}</p>
        )}
      </div>
      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <Select
              variant="bordered"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              selectedKeys={field.value}
              onSelectionChange={field.onChange}
              label="Tech tags"
              placeholder="Select tags"
              selectionMode="multiple"
              className="max-w-xs"
            >
              {TECH_TAGS.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </Select>
          )
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
      <SubmitButton submitting={submitting} />
    </form>
  )
}
