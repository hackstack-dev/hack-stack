import React from 'react'
import type { Node } from 'reactflow'
import { cn } from '@/app/lib/utils'
import type { StackState } from '@/app/hs/stacks/create/create.types'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'
import BlockNodeDataDisplay from '@/app/hs/components/ui/FlowEditor/node-types/BlockNodeDataDisplay'
import type { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'

interface BlocksSummaryProps {
  stackBlocks: StackState['stackBlocks']
}
const BlocksSummary = ({ stackBlocks }: BlocksSummaryProps) => {
  return (
    <div className="mt-10">
      <FancyStepTitle>Blocks</FancyStepTitle>
      <div className="my-8 flex flex-wrap items-start gap-4">
        {stackBlocks.map((block, index, list) => {
          return block.type === 'blockNode' && !block.parentNode ? (
            <BlockNodeDataDisplay
              key={block.id}
              selected={false}
              {...(block as Node<BlockNodeData>).data}
            />
          ) : block.type === 'resizeableGroupNode' ? (
            <div
              className={cn(
                'bg-amber-200/30 dark:bg-primary-400/20 p-4',
                'border-1 border-primary dark:border-primary-100 rounded-medium'
              )}
            >
              <div className="text-lg mb-2">{block.data.blockName}</div>
              <div className="flex flex-col gap-4">
                {list
                  .filter((n) => n.parentNode === block.id)
                  .map((b) => (
                    <BlockNodeDataDisplay
                      key={b.id}
                      selected={false}
                      {...(b as Node<BlockNodeData>).data}
                    />
                  ))}
              </div>
            </div>
          ) : null
        })}
      </div>
    </div>
  )
}

export default BlocksSummary
