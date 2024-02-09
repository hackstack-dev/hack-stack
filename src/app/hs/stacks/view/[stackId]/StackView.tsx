'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { Node, useNodesState } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Spinner } from '@nextui-org/react'
import Flow from '@/app/hs/stacks/components/blocks/Flow'
import Likes from '@/app/hs/stacks/components/Likes'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { RoughNotation } from 'react-rough-notation'
import { Button } from '@nextui-org/button'
import { LucideGithub, LucideHome } from 'lucide-react'

interface StackViewProps {
  stackId: Id<'stacks'>
}
export default function StackView({ stackId }: StackViewProps) {
  const { isAuthenticated } = useConvexAuth()
  const shouldFetch = isAuthenticated && stackId
  const stack = useQuery(
    api.stack.getPublicStack,
    shouldFetch ? { stackId } : 'skip'
  )
  const [nodes, setNodes, onNodesChange] = useNodesState([])

  React.useEffect(() => {
    if (stack) {
      setNodes(stack.stackBlocks as Node<BlockNodeData>[])
    }
  }, [stack, setNodes])

  return (
    <>
      {!stack && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {stack && (
        <div className="flex flex-col h-[calc(100vh-98px)]">
          <header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RoughNotation type="highlight" color="#d946ef" show>
                  <h1 className="text-2xl px-2 py-1">{stack.name}</h1>
                </RoughNotation>
                {!stack.sourceCodeUrl && (
                  <Button
                    as={'a'}
                    href={stack.sourceCodeUrl}
                    target={'_blank'}
                    variant="light"
                    radius="full"
                    size="sm"
                    isIconOnly
                  >
                    <LucideGithub size={20} />
                  </Button>
                )}
                {!stack.websiteUrl && (
                  <Button
                    as={'a'}
                    href={stack.websiteUrl}
                    target={'_blank'}
                    variant="light"
                    radius="full"
                    size="sm"
                    isIconOnly
                  >
                    <LucideHome size={20} />
                  </Button>
                )}
              </div>

              <div className="flex items-center flex-row-reverse gap-2">
                <UserAvatar userId={stack.userId} withName />
                <Likes stackId={stackId} />
              </div>
            </div>
            {stack.projectTypes.map((type) => (
              <span key={type} className="inline-block mr-3 text-sm">
                <RoughNotation type="underline" color="#22d3ee" show>
                  {type}
                </RoughNotation>
              </span>
            ))}
            {stack.description && (
              <RoughNotation
                type="bracket"
                color="#22d3ee"
                brackets={['left', 'right']}
                show
              >
                <p className="text-default-500 text-sm mt-4">
                  {stack.description}
                </p>
              </RoughNotation>
            )}
          </header>

          <div className="grow">
            <Flow
              nodes={nodes}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              viewOnly
            />
          </div>
        </div>
      )}
    </>
  )
}
