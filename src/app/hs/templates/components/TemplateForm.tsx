import React from 'react'
import { type Edge, type Node, useReactFlow } from 'reactflow'
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Textarea } from '@nextui-org/input'
import type { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Button } from '@nextui-org/button'
import TemplateBlocks from '@/app/hs/templates/components/TemplateBlocks'
import { Switch } from '@nextui-org/react'
import type { Id } from '~/convex/_generated/dataModel'
import { toast } from 'sonner'
import { LucideTrash } from 'lucide-react'

const templateFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Template name must contain at least 3 characters')
    .max(50, 'Template name must contain at most 50 characters'),
  description: z
    .string()
    .min(20, 'Template description must contain at least 20 characters')
    .max(500, 'Template description must contain at most 500 characters'),
  isPublic: z.boolean()
})

export type TemplateFormState = z.infer<typeof templateFormSchema>

interface TemplateFormProps {
  title: string
  defaultValues: TemplateFormState
  initialNodes: Node<BlockNodeData, string | undefined>[]
  initialEdges: Edge[]
  templateId?: Id<'templates'>
}
export default function TemplateForm({
  title,
  defaultValues,
  initialNodes,
  initialEdges,
  templateId
}: TemplateFormProps) {
  const [submitting, setSubmitting] = React.useState(false)
  const [blocksError, setBlocksError] = React.useState('')
  const router = useRouter()
  const { getNodes } = useReactFlow<BlockNodeData>()
  const { control, handleSubmit, reset } = useForm<TemplateFormState>({
    resolver: zodResolver(templateFormSchema),
    defaultValues
  })

  const createTemplate = useMutation(api.templates.createTemplate)
  const updateTemplate = useMutation(api.templates.updateTemplate)
  const deleteTemplate = useMutation(api.templates.deleteTemplate)

  const onSubmit: SubmitHandler<TemplateFormState> = async ({
    name,
    description,
    isPublic
  }) => {
    setBlocksError('')
    setSubmitting(true)
    try {
      if (getNodes().length === 0) {
        setBlocksError('You must add at least one block to the template')
        return
      }
      const payload = {
        name,
        description,
        isPublic,
        blocks: getNodes()
      }
      templateId
        ? await updateTemplate({
            templateId,
            ...payload
          })
        : await createTemplate(payload)

      if (templateId) {
        toast.success('Template updated successfully')
      } else {
        toast.success('Template created successfully')
        router.push('/hs/templates')
      }
    } catch (error) {
      console.error(error)
      setBlocksError('Failed to save template')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!templateId) return
    try {
      await deleteTemplate({ templateId })
      router.push('/hs/templates')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete template')
    }
  }
  return (
    <div className="grid grid-col-1 grow md:grid-cols-[1fr_400px] border dark:border-default-50 rounded-large">
      <div className="border-r dark:border-default-50 relative">
        <TemplateBlocks
          initialNodes={initialNodes}
          initialEdges={initialEdges}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-6"
      >
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          {templateId && (
            <Button
              onClick={handleDelete}
              size="sm"
              color="danger"
              variant="flat"
              radius="full"
              isIconOnly
            >
              <LucideTrash size={16} strokeWidth={2} />
            </Button>
          )}
        </header>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              isRequired
              variant="bordered"
              label="Template name"
              labelPlacement="outside"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
              description="Name your template. for example: 'The Static Site Stack'"
            />
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
              description="Template description describes the types of stacks that can be created using this template. for example: 'A stack for creating static websites using Next.js, Gatsby, or Astro'"
            />
          )}
        />
        <div>
          <Controller
            name="isPublic"
            control={control}
            render={({ field, fieldState }) => (
              <Switch
                isSelected={field.value}
                onChange={field.onChange}
                size="sm"
              >
                Public
              </Switch>
            )}
          />
          <p className="text-foreground-400 text-xs mt-1 pl-1">
            Is this template public and visible to everyone?
          </p>
        </div>
        <Button
          type="submit"
          color="secondary"
          variant="solid"
          radius="md"
          isLoading={submitting}
        >
          Save Template
        </Button>
        {blocksError && <p className="text-danger text-sm">{blocksError}</p>}
      </form>
    </div>
  )
}
