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
import { LucideFilePenLine, LucideLayers3 } from 'lucide-react'
import StackBlocks from '@/app/hs/stacks/components/blocks/StackBlocks'
import { cn } from '@/app/lib/utils'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { Stack } from '~/convex/types'
import { toast } from 'sonner'
import EditStackActions from '@/app/hs/stacks/[stackId]/EditStackActions'
import Likes from '@/app/hs/stacks/components/Likes'
import { useRouter } from 'next/navigation'
import PublicPrivateIndication from '@/app/hs/components/ui/PublicPrivateIndication'

interface EditStackProps {
  stackState: StackStateProps['stackState']
  stack: Stack
  stackId: Id<'stacks'>
}
export default function EditStack({
  stack,
  stackState,
  stackId
}: EditStackProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = React.useState<string | number>('blocks')
  const { getNodes, validateBlocks, error } = useBlockNodes()
  const updateStack = useMutation(api.stack.updateStack)
  const deleteStack = useMutation(api.stack.deleteStack)

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
        stackBlocks: nodes,
        isPublic: stack.isPublic
      }
      await updateStack({ stackId, stack: updatedStack })
      toast.success('Changes saved')
    } catch (error) {
      console.error('Error saving changes', error)
    }
  }

  const handlePublicChange = async () => {
    try {
      const updatedStack = {
        ...stack,
        isPublic: !stack.isPublic
      }
      await updateStack({ stackId, stack: updatedStack })
      toast.success('Public status changed')
    } catch (error) {
      toast.error('Error changing public status')
      console.error('Error saving changes', error)
    }
  }

  const handleDeleteStack = async () => {
    try {
      await deleteStack({ stackId })
      toast.success('Stack deleted')
      router.push('/hs/stacks')
    } catch (error) {
      toast.error('Error deleting stack')
      console.error('Error deleting stack', error)
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
        <div className="flex items-center flex-row-reverse gap-2">
          <PublicPrivateIndication isPublic={stack.isPublic} />
          <Likes stackId={stackId} />
        </div>
      </header>

      <div className="flex items-center justify-between">
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
                <LucideLayers3 size={16} strokeWidth={1} />
                <span>Blocks</span>
              </div>
            }
          />
          <Tab
            key="details"
            title={
              <div className="flex items-center space-x-2">
                <LucideFilePenLine size={16} strokeWidth={1} />
                <span>Details</span>
              </div>
            }
          />
        </Tabs>

        <EditStackActions
          onSaveChanges={handleSaveChanges}
          onPublicChange={handlePublicChange}
          onStackDelete={handleDeleteStack}
          isPublic={stack.isPublic}
        />
      </div>
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
