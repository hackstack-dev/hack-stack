import { Handle, HandleType, Position } from 'reactflow'

export interface CustomHandleProps {
  type: HandleType
  visible: boolean
  orientation: 'vertical' | 'horizontal'
  nodeType: string
  theme?: string
  customBackgroundColor?: string
  customBorderColor?: string
}
export default function CustomHandle({
  type,
  visible,
  orientation,
  theme,
  nodeType,
  customBackgroundColor,
  customBorderColor
}: CustomHandleProps) {
  const position =
    type === 'target'
      ? orientation === 'vertical'
        ? Position.Top
        : Position.Left
      : orientation === 'vertical'
        ? Position.Bottom
        : Position.Right

  const backgroundColor = theme === 'dark' ? '#111' : '#fff'
  const borderColor =
    nodeType === 'blockNode' ? '#8b5cf6' : theme === 'dark' ? '#22d3ee' : '#000'
  return visible ? (
    <Handle
      type={type}
      position={position}
      isConnectable={true}
      style={{
        background: customBackgroundColor ?? backgroundColor,
        border: '1px solid',
        borderColor: customBorderColor ?? borderColor,
        height: '10px',
        width: '10px'
      }}
    />
  ) : null
}
