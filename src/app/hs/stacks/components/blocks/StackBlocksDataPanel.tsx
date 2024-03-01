import React from 'react'
import { Node } from 'reactflow'
import {
  BlockNodeData,
  GroupNodeData
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import { LucideArrowLeft } from 'lucide-react'
import BlockDataPanel from '@/app/hs/stacks/components/blocks/BlockDataPanel'
import { ScrollShadow } from '@nextui-org/react'
import GroupDataPanel from '@/app/hs/stacks/components/blocks/GroupDataPanel'

interface BlockDataPanelProps {
  nodes: Node<BlockNodeData | GroupNodeData>[]
  onUpdateBlock: (
    blockId: BlockNodeData['id'],
    blockSelectedTech: BlockNodeData['tech']
  ) => void
  onUpdateGroup: (
    groupId: GroupNodeData['id'],
    groupBlockName: GroupNodeData['blockName']
  ) => void
  onDetachBlock: (blockId: string) => void
}
export default function StackBlocksDataPanel({
  nodes,
  onUpdateBlock,
  onUpdateGroup,
  onDetachBlock
}: BlockDataPanelProps) {
  const selectedNode = React.useMemo(
    () => nodes?.find((node) => node.selected),
    [nodes]
  )

  return (
    <ScrollShadow
      className="p-4 h-[calc(100vh-230px)] w-full bg-default-50 dark:bg-black border-l-1 dark:border-default-50"
      hideScrollBar
    >
      {selectedNode && selectedNode.type === 'blockNode' && (
        <BlockDataPanel
          selectedNode={selectedNode as Node<BlockNodeData>}
          onUpdateBlock={onUpdateBlock}
        />
      )}
      {selectedNode && selectedNode.type === 'resizeableGroupNode' && (
        <GroupDataPanel
          nodes={nodes}
          selectedNode={selectedNode as Node<GroupNodeData>}
          onUpdateGroup={onUpdateGroup}
          onDetachBlock={onDetachBlock}
        />
      )}
      {!selectedNode && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-default-400 p-5 border border-dashed border-secondary/50 rounded-medium flex items-center gap-2">
            <LucideArrowLeft />
            Select a block to view details
          </p>
        </div>
      )}
    </ScrollShadow>
  )
}
