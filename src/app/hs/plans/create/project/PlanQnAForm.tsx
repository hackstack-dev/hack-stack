import ProjectType from '@/app/hs/plans/create/project/ProjectType'
import { Input } from '@nextui-org/input'
import React from 'react'
import { proxy, useSnapshot } from 'valtio'

export const projectNameState = proxy({ value: 'Project name' })
export default function PlanQnAForm() {
  const projectName = useSnapshot(projectNameState)
  return (
    <div className="p-4 max-w-xl mx-auto">
      <Input
        size="lg"
        variant="underlined"
        label="Project name"
        className="text-2xl"
        value={projectName.value}
        onValueChange={(value) => {
          projectNameState.value = value
        }}
      />
      <ProjectType />
    </div>
  )
}
