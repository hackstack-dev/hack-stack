import React from 'react'
import { StackState } from '@/app/hs/stacks/create/create.types'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'
import { Divider } from '@nextui-org/react'
import Drawer from '@/app/hs/components/ui/drawer/Drawer'

interface StacksBlocksHeaderProps {
  stackState: StackState
}
export function StacksBlocksHeader({ stackState }: StacksBlocksHeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="py-4 flex items-center gap-4">
      <span>{stackState.name}</span>
      <Divider orientation="vertical" className="h-5" />
      <span>{stackState.template.name}</span>
      <Divider orientation="vertical" className="h-5" />
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen} />
      <span className="cursor-pointer" onClick={() => setIsOpen(true)}>
        Edit
      </span>
    </div>
  )
}
