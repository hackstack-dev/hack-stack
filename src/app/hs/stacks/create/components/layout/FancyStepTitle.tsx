import React from 'react'

export function FancyStepTitle({ children }: React.PropsWithChildren) {
  return (
    <h2 className="font-light text-2xl bg-gradient-to-b from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
      {children}
    </h2>
  )
}
