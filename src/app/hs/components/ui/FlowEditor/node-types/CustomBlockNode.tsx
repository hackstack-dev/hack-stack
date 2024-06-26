import { cn, getTechLogo } from '@/app/lib/utils'
import Image from 'next/image'
import type {
  BlockNodeData,
  BlocksConfig
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import { useTheme } from 'next-themes'
import type { NodeProps } from 'reactflow'
import React from 'react'
import { useSnapshot } from 'valtio'
import { shareStackBlockSettings } from '@/app/hs/stacks/components/share/Share.state'
import CustomHandle from '@/app/hs/components/ui/FlowEditor/handles/CustomHandle'

export default function CustomBlockNode({
  data: { blockName, tech, orientation, enableConnections }
}: NodeProps<
  BlockNodeData & {
    orientation: BlocksConfig['connectionsOrientation']
    enableConnections: BlocksConfig['enableConnections']
  }
>) {
  const { theme } = useTheme()
  const techLogo = tech?.icon ?? 'icon.svg'
  const shareBlockSettings = useSnapshot(shareStackBlockSettings)

  const { fontSize, color, techColor, techFontSize, ...rest } =
    shareBlockSettings ?? {}

  const innerBorder = React.useMemo(() => {
    if (shareBlockSettings) {
      return {
        borderLeft: `${shareBlockSettings.borderWidth}px solid ${shareBlockSettings.borderColor}`
      }
    }
    return {}
  }, [shareBlockSettings])

  const blockNameStyle = React.useMemo(() => {
    if (fontSize && color) {
      return {
        color,
        fontSize
      }
    }
    return {}
  }, [fontSize, color])

  const techNameStyle = React.useMemo(() => {
    if (techColor && techFontSize) {
      return {
        color: techColor,
        fontSize: techFontSize
      }
    }
    return {}
  }, [techColor, techFontSize])

  return (
    <>
      <CustomHandle
        type={'target'}
        visible={enableConnections}
        orientation={orientation}
        nodeType={'blockNode'}
        theme={theme}
        customBackgroundColor={shareBlockSettings.background}
        customBorderColor={shareBlockSettings.borderColor}
      />
      <div
        className={cn(
          shareBlockSettings.blockSize === 'default' && 'min-w-[200px]'
        )}
        style={rest}
      >
        <div className="flex items-stretch">
          <div
            className={cn(
              'flex flex-col justify-center',
              shareBlockSettings.blockSize === 'default' ? 'px-2' : 'p-2'
            )}
          >
            <Image
              src={getTechLogo(techLogo, theme)}
              alt={techLogo}
              width={32}
              height={32}
              className="h-8"
            />
          </div>
          {shareBlockSettings.blockSize === 'default' && (
            <div className="py-2 px-4" style={innerBorder}>
              <h3 style={blockNameStyle}>{blockName}</h3>
              <span style={techNameStyle}>{tech?.name}</span>
            </div>
          )}
        </div>
      </div>
      <CustomHandle
        type={'source'}
        visible={enableConnections}
        orientation={orientation}
        nodeType={'blockNode'}
        theme={theme}
        customBackgroundColor={shareBlockSettings.background}
        customBorderColor={shareBlockSettings.borderColor}
      />
    </>
  )
}
