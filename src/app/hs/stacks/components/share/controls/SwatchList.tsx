import { GRADIENTS } from '@/app/hs/stacks/components/share/ShareStack.utils'
import React from 'react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'

interface SwatchProps {
  list: string[]
  onClick: (background: string) => void
  withColorControl?: boolean
}
export default function SwatchList({
  list,
  onClick,
  withColorControl
}: SwatchProps) {
  return (
    <div className="grid grid-cols-6 gap-2 mt-4">
      {list.map((item) => (
        <div
          onClick={() => onClick(item)}
          className="w-8 h-8 rounded-full cursor-pointer border border-default-100"
          style={{ background: item }}
        />
      ))}
      {withColorControl && <ColorControl onChange={onClick} />}
    </div>
  )
}
