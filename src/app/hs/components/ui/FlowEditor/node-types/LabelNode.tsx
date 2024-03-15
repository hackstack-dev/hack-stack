import type { NodeProps } from 'reactflow'
import React from 'react'
import type { StackDetailsNodeData } from '@/app/hs/stacks/components/share/ShareStack.types'
import { useSnapshot } from 'valtio'
import { shareStackDetailsSettings } from '@/app/hs/stacks/components/share/Share.state'
import FancyPlanTitle from "@/app/hs/plans/create/project/FancyPlanTitle";

export default function LabelNode({ data: { label } }: NodeProps) {
  return (
    <div>
      <FancyPlanTitle>{label}</FancyPlanTitle>
    </div>
  )
}
