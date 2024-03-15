import type React from 'react'

export function FancyStepTitle({ children }: React.PropsWithChildren) {
  return (
    <h2 className="font-light text-2xl bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent">
      {children}
    </h2>
  )
}
