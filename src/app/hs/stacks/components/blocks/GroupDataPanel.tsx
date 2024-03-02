import {
  BlockNodeData,
  GroupNodeData
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Node } from 'reactflow'
import { Input } from '@nextui-org/input'
import React from 'react'
import { cn, getTechLogo } from '@/app/lib/utils'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { LucideMinus, LucideX } from 'lucide-react'
interface GroupDataPanelProps {
  nodes: Node<BlockNodeData | GroupNodeData>[]
  selectedNode: Node<GroupNodeData>
  onUpdateGroup: (
    groupId: GroupNodeData['id'],
    groupBlockName: GroupNodeData['blockName']
  ) => void
  onDetachBlock: (blockId: string) => void
}
export default function GroupDataPanel({
  nodes,
  selectedNode,
  onUpdateGroup,
  onDetachBlock
}: GroupDataPanelProps) {
  const { theme } = useTheme()
  const groupBlocks = React.useMemo(() => {
    return nodes.filter((node) => node.parentNode === selectedNode.id)
  }, [nodes, selectedNode.id])
  return (
    <div>
      <Input
        variant="underlined"
        label="Group name"
        value={selectedNode.data.blockName}
        onValueChange={(value) => {
          onUpdateGroup(selectedNode.id, value)
        }}
      />
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center gap-4">
        {groupBlocks.map((block) => {
          const { data, id: nodeId } = block as Node<BlockNodeData>
          return (
            <li
              key={block.id}
              className="border border-default-400 dark:border-default-100 p-2 rounded-medium relative"
            >
              <Image
                src={getTechLogo(data.tech.icon, theme)}
                alt={data.tech.name}
                width={32}
                height={32}
                className="h-8 mx-auto"
              />
              <span className="text-xs">{data.tech.name}</span>
              <div
                onClick={() => onDetachBlock(nodeId)}
                className={cn(
                  'absolute -right-2 -top-2',
                  'h-5 w-5 rounded-full bg-primary/90 cursor-pointer',
                  'flex flex-col justify-center items-center',
                  'border-1 border-default-50'
                )}
              >
                <LucideMinus stroke="#fff" size={18} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
