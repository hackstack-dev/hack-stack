import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'
import type React from 'react'

export default function FancyPlanTitle({ children }: React.PropsWithChildren) {
  return (
    <h2 className="font-light text-xl bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent">
      {children}
    </h2>
  )
}
