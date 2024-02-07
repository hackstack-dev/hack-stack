import React from 'react'
import { useForm } from 'react-hook-form'
import {
  StackForm,
  stackFormSchema,
  StackStateProps
} from '@/app/hs/stacks/create/create.types'
import { zodResolver } from '@hookform/resolvers/zod'
import StackDetailsForm from '@/app/hs/stacks/components/StackDetailsForm'
import useBlockNodes from '@/app/hs/stacks/components/blocks/hooks/useBlockNodes'
import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { LucideFilePenLine, LucideLayers3 } from 'lucide-react'
import StackBlocks from '@/app/hs/stacks/components/blocks/StackBlocks'
import { cn } from '@/app/lib/utils'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { Stack } from '~/convex/types'
import { toast } from 'sonner'

interface EditStackProps {
  stackState: StackStateProps['stackState']
  stack: Stack
  id: Id<'stacks'>
}
export default function EditStack({ stack, stackState, id }: EditStackProps) {
  const [viewMode, setViewMode] = React.useState<string | number>('blocks')
  const { getNodes, validateBlocks, error } = useBlockNodes()
  const updateStack = useMutation(api.stack.updateStack)

  const form = useForm<StackForm>({
    resolver: zodResolver(stackFormSchema),
    defaultValues: stackState
  })

  const handleSaveChanges = async () => {
    try {
      if (viewMode === 'blocks') {
        await validateBlocks()
      } else {
        const isValid = await form.trigger()
        if (!isValid) {
          return
        }
      }
      const nodes = getNodes()
      const values = form.getValues()
      const templateId = stack.templateId
      const coverImage = stack.coverImage
      const updatedStack = {
        ...values,
        templateId,
        coverImage,
        stackBlocks: nodes
      }
      await updateStack({ stackId: id, stack: updatedStack })
      toast.success('Changes saved')
    } catch (error) {
      console.error('Error saving changes', error)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-98px)]">
      <header className="pb-6 flex items-center justify-between">
        <Breadcrumbs>
          <BreadcrumbItem href="/hs/stacks">
            <span>Stacks</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>{stackState.name}</span>
          </BreadcrumbItem>
        </Breadcrumbs>
        {error && <p className="text-small text-danger pr-2">{error}</p>}
        <div>
          <Button onClick={handleSaveChanges}>Save changes</Button>
        </div>
      </header>

      <Tabs
        aria-label="Options"
        variant="bordered"
        size="sm"
        onSelectionChange={setViewMode}
        className="mb-4"
      >
        <Tab
          key="blocks"
          title={
            <div className="flex items-center space-x-2">
              <LucideLayers3 size={16} />
              <span>Blocks</span>
            </div>
          }
        />
        <Tab
          key="details"
          title={
            <div className="flex items-center space-x-2">
              <LucideFilePenLine size={16} />
              <span>Details</span>
            </div>
          }
        />
      </Tabs>

      <StackBlocks
        initialNodes={stackState.stackBlocks ?? []}
        hidden={viewMode === 'details'}
      />
      <div className={cn(viewMode === 'blocks' && 'hidden')}>
        <StackDetailsForm form={form} />
      </div>
    </div>
  )
}
