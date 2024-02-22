import React from 'react'

interface ControlsSectionProps {
  title: string
}
export default function ControlsSection({
  title,
  children
}: React.PropsWithChildren<ControlsSectionProps>) {
  return (
    <>
      <span className="text-sm font-semibold pb-6">{title}</span>
      {children}
    </>
  )
}
