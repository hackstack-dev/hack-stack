import React from 'react'

export function FancyStepTitle({ children }: React.PropsWithChildren) {
  return (
    <h2 className="font-light text-2xl dark:bg-gradient-to-br dark:from-secondary dark:to-primary dark:bg-clip-text dark:text-transparent">
      {children}
    </h2>
  )
}
