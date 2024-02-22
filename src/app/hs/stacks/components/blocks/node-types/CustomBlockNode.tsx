import { getTechLogo } from '@/app/lib/utils'

import Image from 'next/image'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { useTheme } from 'next-themes'
import { NodeProps } from 'reactflow'
import React from 'react'

export default function CustomBlockNode({
  data: { blockName, tech, style }
}: NodeProps<BlockNodeData>) {
  const { theme } = useTheme()
  const techLogo = tech?.icon ?? 'icon.svg'

  const { fontSize, color, techColor, techFontSize, ...rest } = style ?? {}

  const innerBorder = React.useMemo(() => {
    if (style) {
      return {
        borderLeft: `${style.borderWidth}px solid ${style.borderColor}`
      }
    }
    return {}
  }, [style])

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
      <div className="min-w-[200px]" style={rest}>
        <div className="flex items-stretch">
          <div className="flex flex-col justify-center px-2">
            <Image
              src={getTechLogo(techLogo, theme)}
              alt={techLogo}
              width={32}
              height={32}
              className="h-8"
            />
          </div>
          <div className="py-2 px-4" style={innerBorder}>
            <h3 style={blockNameStyle}>{blockName}</h3>
            <span style={techNameStyle}>{tech?.name}</span>
          </div>
        </div>
      </div>
    </>
  )
}
