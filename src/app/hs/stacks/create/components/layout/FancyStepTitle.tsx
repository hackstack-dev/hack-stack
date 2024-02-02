import React from 'react'

export function FancyStepTitle({ children }: React.PropsWithChildren) {
  return (
    <h2 className="font-light text-2xl dark:bg-gradient-to-b dark:from-amber-300 dark:via-orange-300 dark:to-red-300 dark:bg-clip-text dark:text-transparent">
      {children}
    </h2>
  )
}
