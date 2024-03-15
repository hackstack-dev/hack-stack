import { type NodeProps, NodeResizer } from 'reactflow'
import type { GroupNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { cn } from '@/app/lib/utils'

export default function ResizableGroupNodeDisplay(
  props: NodeProps<GroupNodeData>
) {
  const { data, selected } = props
  return (
    <div
      className={cn(
        'bg-amber-200/30 dark:bg-black/20',
        'border-1 border-primary dark:border-secondary-400 rounded-medium',
        'h-full z-0'
      )}
    >
      <NodeResizer
        color="#d946ef"
        isVisible={selected}
        minWidth={230}
        minHeight={230}
        handleStyle={{
          width: 10,
          height: 10
        }}
      />
      <div className="text-center text-lg p-2 break-words border-b border-primary dark:border-secondary-400">
        {data.blockName}
      </div>
    </div>
  )
}
