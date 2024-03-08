import {
  BlocksConfig,
  GroupNodeData
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import { NodeProps, NodeResizer } from 'reactflow'
import React from 'react'
import { useSnapshot } from 'valtio'
import { shareStackGroupSettings } from '@/app/hs/stacks/components/share/Share.state'
import CustomHandle from '@/app/hs/stacks/components/blocks/handles/CustomHandle'
import { useTheme } from 'next-themes'

export default function CustomGroupNode({
  selected,
  data: { blockName, orientation, enableConnections }
}: NodeProps<
  GroupNodeData & {
    orientation: BlocksConfig['connectionsOrientation']
    enableConnections: BlocksConfig['enableConnections']
  }
>) {
  const { theme } = useTheme()
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
    <>
      <CustomHandle
        type={'target'}
        visible={enableConnections}
        orientation={orientation}
        nodeType={'resizeableGroupNode'}
        theme={theme}
        customBackgroundColor={shareGroupSettings.background}
        customBorderColor={shareGroupSettings.borderColor}
      />
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
      <CustomHandle
        type={'source'}
        visible={enableConnections}
        orientation={orientation}
        nodeType={'resizeableGroupNode'}
        theme={theme}
        customBackgroundColor={shareGroupSettings.background}
        customBorderColor={shareGroupSettings.borderColor}
      />
    </>
  )
}
