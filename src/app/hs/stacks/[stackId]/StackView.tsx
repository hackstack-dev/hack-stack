'use client'

import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import {
  BreadcrumbItem,
  Breadcrumbs,
  ButtonGroup,
  Spinner,
  Tab,
  Tabs
} from '@nextui-org/react'
import { Doc, Id } from '~/convex/_generated/dataModel'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import {
  LucideFilePenLine,
  LucideLayers,
  LucideLayers3,
  LucideListPlus,
  LucidePercent,
  LucideSigma
} from 'lucide-react'
import CreateStackDetails from '@/app/hs/stacks/create/components/steps/create-blocks/CreateStackDetails'
import { StackState } from '@/app/hs/stacks/create/create.types'
import type { Node } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import EditStackDetails from '@/app/hs/stacks/[stackId]/EditStackDetails'
import StackBlocks from '@/app/hs/stacks/components/blocks/StackBlocks'
import useBlockNodes from '@/app/hs/stacks/components/blocks/hooks/useBlockNodes'

interface StackViewProps {
  id: Id<'stacks'>
}
export default function StackView({ id }: StackViewProps) {
  const { isAuthenticated } = useConvexAuth()
  const shouldFetch = isAuthenticated && id
  const stack = useQuery(api.stack.getStack, shouldFetch ? { id } : 'skip')
  const [editStackState, setStackState] = React.useState<StackState>({
    name: '',
    projectTypes: [],
    sourceCodeUrl: '',
    websiteUrl: '',
    description: '',
    stackBlocks: []
  })

  const [viewMode, setViewMode] = React.useState<'details' | 'blocks'>('blocks')
  const { getNodes, validateBlocks, error } = useBlockNodes()

  React.useEffect(() => {
    if (stack) {
      setStackState({
        name: stack.name,
        projectTypes: stack.projectTypes,
        sourceCodeUrl: stack.sourceCodeUrl,
        websiteUrl: stack.websiteUrl,
        description: stack.description,
        stackBlocks: stack.stackBlocks as Node<BlockNodeData>[]
      })
    }
  }, [stack])

  const handleStackStateChange = React.useCallback(
    (newState: Partial<StackState>) => {
      setStackState((prev) => ({ ...prev, ...newState }))
    },
    []
  )

  const handleSaveChanges = async () => {
    await validateBlocks()
    // TODO: update stack
    //await api.stack.updateStack({ id, stack: editStackState })
  }

  return (
    <>
      {!stack && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {editStackState.name && (
        <div>
          <header className="pb-6 flex items-center justify-between">
            <Breadcrumbs>
              <BreadcrumbItem href="/hs/stacks">
                <span>Stacks</span>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span>{editStackState.name}</span>
              </BreadcrumbItem>
            </Breadcrumbs>
            {error && <p className="text-small text-danger pr-2">{error}</p>}
            <div>
              <Button onClick={handleSaveChanges}>Save changes</Button>
            </div>
          </header>

          <Tabs aria-label="Options" variant="bordered" size="sm" >
            <Tab
              key="blocks"
              title={
                <div className="flex items-center space-x-2">
                  <LucideLayers3 size={16} />
                  <span>Blocks</span>
                </div>
              }
            >
              <StackBlocks initialNodes={editStackState.stackBlocks ?? []} />
            </Tab>
            <Tab
              key="details"
              title={
                <div className="flex items-center space-x-2">
                  <LucideFilePenLine size={16} />
                  <span>Details</span>
                </div>
              }
            >
              <EditStackDetails
                stackState={editStackState}
                onStateChange={handleStackStateChange}
              />
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  )
}
