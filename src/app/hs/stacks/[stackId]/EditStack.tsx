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
import {
  BreadcrumbItem,
  Breadcrumbs,
  Tooltip,
  Tab,
  Tabs
} from '@nextui-org/react'
import {
  LucideFilePenLine,
  LucideLayers3,
  LucideMessageCircle,
  LucidePanelsTopLeft
} from 'lucide-react'
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
import EditStackCoverImage from '@/app/hs/stacks/[stackId]/EditStackCoverImage'
import StackFeedbackSettings from '@/app/hs/stacks/[stackId]/StackFeedbackSettings'
import Link from 'next/link'
import { Button } from '@nextui-org/button'

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
      <header className="py-4 flex items-center justify-between border-b dark:border-default-50">
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
          <div className="flex items-center gap-2">
            <PublicPrivateIndication isPublic={stack.isPublic} />
            {stack.isPublic && (
              <Tooltip content="Go to stack public view">
                <Button
                  variant="flat"
                  radius="full"
                  size="sm"
                  as={Link}
                  href={`/hs/stacks/view/${stackId}`}
                  isIconOnly
                >
                  <LucidePanelsTopLeft size={16} />
                </Button>
              </Tooltip>
            )}
          </div>
          <Likes stackId={stackId} />
        </div>
      </header>

      <div className="flex items-center justify-between mt-4">
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
          <Tab
            key="feedback"
            title={
              <div className="flex items-center space-x-2">
                <LucideMessageCircle size={16} strokeWidth={1} />
                <span>Feedback</span>
              </div>
            }
          />
        </Tabs>
        {viewMode !== 'feedback' && (
          <EditStackActions
            onSaveChanges={handleSaveChanges}
            onPublicChange={handlePublicChange}
            onStackDelete={handleDeleteStack}
            isPublic={stack.isPublic}
          />
        )}
      </div>
      <StackBlocks
        initialNodes={stackState.stackBlocks ?? []}
        hidden={viewMode !== 'blocks'}
      />

      <div className={cn(viewMode !== 'details' && 'hidden')}>
        <StackDetailsForm form={form} />
        <EditStackCoverImage stack={stack} stackId={stackId} />
      </div>
      <div className={cn(viewMode !== 'feedback' && 'hidden')}>
        <StackFeedbackSettings stack={stack} stackId={stackId} />
      </div>
    </div>
  )
}
