import React from 'react'

interface ControlsRowProps {
  label: string
}
export default function ControlsRow({
  children,
  label
}: React.PropsWithChildren<ControlsRowProps>) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs text-default-400 w-[200px]">{label}</label>
      {children}
    </div>
  )
}
