import { NodeProps } from 'reactflow'
import React from 'react'
import { StackDetailsNodeData } from '@/app/hs/stacks/components/share/ShareStack.types'

export default function StackDetailsNode({
  data: { name, description, show, style }
}: NodeProps<StackDetailsNodeData>) {
  const { fontSize, color, descriptionColor, descriptionFontSize, ...rest } =
    style ?? {}

  const stackNameStyle = React.useMemo(() => {
    if (fontSize && color) {
      return {
        color,
        fontSize
      }
    }
    return {}
  }, [fontSize, color])

  const stackDescriptionStyle = React.useMemo(() => {
    if (descriptionColor && descriptionFontSize) {
      return {
        color: descriptionColor,
        fontSize: descriptionFontSize
      }
    }
    return {}
  }, [descriptionColor, descriptionFontSize])

  return show ? (
    <div className="min-w-[200px] px-6 py-4" style={rest}>
      <h1 style={stackNameStyle}>{name}</h1>
      <p style={stackDescriptionStyle}>{description}</p>
    </div>
  ) : null
}
