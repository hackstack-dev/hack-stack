import { GroupNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { NodeProps, NodeResizer } from 'reactflow'
import React from 'react'
import { useSnapshot } from 'valtio'
import { shareStackGroupSettings } from '@/app/hs/stacks/components/share/Share.state'

export default function CustomGroupNode({
  selected,
  data: { blockName }
}: NodeProps<GroupNodeData>) {
  const shareGroupSettings = useSnapshot(shareStackGroupSettings)
  const { fontSize, color, ...rest } = shareGroupSettings ?? {}

  const groupNameStyle = React.useMemo(() => {
    if (fontSize && color) {
      return {
        color,
        fontSize
      }
    }
    return {}
  }, [fontSize, color])

  const groupNameBorderStyle = React.useMemo(() => {
    if (rest.borderColor || rest.borderWidth) {
      return {
        borderBottom: `${rest.borderWidth}px solid ${rest.borderColor}`
      }
    }
    return {}
  }, [rest.borderColor, rest.borderWidth])

  return (
    <div className="h-full" style={rest}>
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
      <div className="p-2" style={groupNameBorderStyle}>
        <span style={groupNameStyle}>{blockName}</span>
      </div>
    </div>
  )
}

/*'bg-amber-200/30 dark:bg-default-200/30',
        'border-1 border-primary dark:border-default-200 rounded-medium',
        'h-full z-0'

 */
