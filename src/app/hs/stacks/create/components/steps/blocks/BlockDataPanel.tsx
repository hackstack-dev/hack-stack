import React from 'react'
import { useOnSelectionChange, Node } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/create/components/steps/blocks/Blocks.types'
import { Input } from '@nextui-org/input'
import { LucideSearch } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import Image from 'next/image'
import { cn, getTechLogo } from '@/app/lib/utils'
import { Id } from '~/convex/_generated/dataModel'

interface BlockDataPanelProps {
  nodes: Node[]
  onUpdateBlock: (
    blockId: BlockNodeData['id'],
    blockSelectedTech: BlockNodeData['tech']
  ) => void
}
export default function BlockDataPanel({
  nodes,
  onUpdateBlock
}: BlockDataPanelProps) {
  const [search, setSearch] = React.useState('')

  const selectedNode = React.useMemo(
    () => nodes.find((node) => node.selected),
    [nodes]
  )

  const tech =
    useQuery(
      api.tech.findTechByBlock,
      !selectedNode?.data?.id
        ? 'skip'
        : { blockId: selectedNode.data.id as Id<'blocks'> }
    ) || []

  return (
    <div className="p-4 h-full w-full bg-default-50 border-l-1 dark:border-default-100">
      {selectedNode ? (
        <>
          <h2 className="text-2xl dark:text-default-500">
            {selectedNode?.data?.blockName}
          </h2>
          {tech && tech.length > 10 && (
            <div className="mt-4">
              <Input
                size="sm"
                placeholder={'Search technologies'}
                onValueChange={setSearch}
                startContent={<LucideSearch />}
              />
            </div>
          )}
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center gap-4">
            {tech.map((tech) => (
              <li
                key={tech._id}
                className={cn(
                  'p-2 cursor-pointer rounded-md hover:ring-1 ring-primary transition-all',
                  selectedNode?.data?.tech?._id === tech._id &&
                    'ring-1 ring-primary'
                )}
                onClick={() => onUpdateBlock(selectedNode.id, tech)}
              >
                <Image
                  src={getTechLogo(tech.icon)}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="h-8 mx-auto"
                />
                <span className="text-xs">{tech.name}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-default-500">Select a block to view details</p>
      )}
    </div>
  )
}
