import React from 'react'
import { useOnSelectionChange, Node } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Input } from '@nextui-org/input'
import { LucideSearch } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import Image from 'next/image'
import { cn, getTechLogo } from '@/app/lib/utils'
import { Doc, Id } from '~/convex/_generated/dataModel'

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
    () => nodes?.find((node) => node.selected),
    [nodes]
  )

  const tech =
    useQuery(
      api.tech.findTechByBlock,
      !selectedNode?.data?.id
        ? 'skip'
        : { blockId: selectedNode.data.id as Id<'blocks'> }
    ) || []

  const handleBlockUpdate = (tech: Doc<'tech'>) => {
    const { _id, _creationTime, ...rest } = tech
    onUpdateBlock(selectedNode?.id ?? '', rest)
  }

  return (
    <div className="p-4 h-full w-full bg-default-50 border-l-1 dark:border-default-100">
      {selectedNode ? (
        <>
          <h2 className="text-2xl dark:text-default-500">
            {selectedNode?.data?.blockName}
          </h2>
          {tech && tech.length > 20 && (
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
            {tech.slice(0, 20).map((tech) => (
              <li
                key={tech.icon}
                className={cn(
                  'p-2 cursor-pointer rounded-md hover:ring-1 ring-secondary transition-all',
                  selectedNode?.data?.tech?.icon === tech.icon &&
                    'ring-1 ring-secondary'
                )}
                onClick={() => handleBlockUpdate(tech)}
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
