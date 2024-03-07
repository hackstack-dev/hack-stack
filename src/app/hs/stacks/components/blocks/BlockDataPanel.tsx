import React from 'react'
import { Node } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Input } from '@nextui-org/input'
import { LucideSearch } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import Image from 'next/image'
import { cn, getTechLogo } from '@/app/lib/utils'
import { Doc, Id } from '~/convex/_generated/dataModel'
import { useTheme } from 'next-themes'
import StackViewTechDetails from '@/app/hs/stacks/view/[stackId]/StackViewTechDetails'

const onDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  nodeData: BlockNodeData
) => {
  event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData))
  event.dataTransfer.effectAllowed = 'move'
}
interface BlockDataPanelProps {
  selectedNode: Node<BlockNodeData>
  onUpdateBlock: (
    blockId: BlockNodeData['id'],
    blockSelectedTech: BlockNodeData['tech']
  ) => void
}
export default function BlockDataPanel({
  selectedNode,
  onUpdateBlock
}: BlockDataPanelProps) {
  const { theme } = useTheme()
  const [search, setSearch] = React.useState('')
  const [draggingId, setDraggingId] = React.useState('')

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
    <>
      <h2 className="text-xl dark:text-default-500">
        {selectedNode?.data?.blockName}
      </h2>
      {tech && tech.length > 20 && (
        <div className="mt-4">
          <Input
            size="sm"
            placeholder={'Search technologies'}
            onValueChange={setSearch}
            startContent={<LucideSearch strokeWidth={1} />}
          />
        </div>
      )}
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center gap-4">
        {tech.slice(0, 20).map((tech) => (
          <li
            key={tech.name}
            className={cn(
              'p-2 cursor-pointer rounded-md ',
              selectedNode?.data?.tech?.name === tech.name &&
                'ring-1 ring-secondary',
              draggingId !== tech.name && 'hover:ring-1 ring-secondary'
            )}
            onClick={() => handleBlockUpdate(tech)}
          >
            <div
              className={cn(
                'flex flex-col items-center transition-all translate-x-0 translate-y-0 transform-gpu',
                draggingId === tech.name &&
                  'select-none cursor-grabbing opacity-10'
              )}
              onDragStart={(event) => {
                setDraggingId(tech.name)
                const { _id, _creationTime, ...rest } = tech
                onDragStart(event, {
                  id: selectedNode.data.id,
                  blockName: selectedNode.data.blockName,
                  tech: rest
                })
              }}
              onDragEnd={(event) => setDraggingId('')}
              draggable
            >
              <Image
                src={getTechLogo(tech.icon, theme)}
                alt={tech.name}
                width={32}
                height={32}
                className="h-8 mx-auto"
              />
              <span className="text-xs">{tech.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-6">
        {selectedNode?.data?.tech?.name && (
          <StackViewTechDetails name={selectedNode.data.tech.name} embeded />
        )}
      </div>
    </>
  )
}
