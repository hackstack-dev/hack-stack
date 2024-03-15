import type { NodeProps } from 'reactflow'
import React from 'react'
import type { StackDetailsNodeData } from '@/app/hs/stacks/components/share/ShareStack.types'
import { useSnapshot } from 'valtio'
import { shareStackDetailsSettings } from '@/app/hs/stacks/components/share/Share.state'

export default function NoteNote({
  data: { title, description }
}: NodeProps<{ title: string; description: string }>) {
  return (
    <div className="w-[300px] px-6 py-4 border-2 border-black  text-black rounded bg-amber-200">
      <h1>{title}</h1>
      <p className="text-sm text-default-600 dark:text-default-200">{description}</p>
    </div>
  )
}
