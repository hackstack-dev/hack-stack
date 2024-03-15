'use client'

import React from 'react'
import FlowProvider from '@/app/hs/components/ui/FlowProvider'
import PlanBlocks from '@/app/hs/plans/components/PlanBlocks'
import PlanQnAForm, {projectNameState} from '@/app/hs/plans/create/project/PlanQnAForm'
import {useSnapshot} from "valtio";

export default function CreatePlanPage() {
  const projectName = useSnapshot(projectNameState)

  // React.useEffect(() => {
  //
  // }, [projectName.value])
  return (
    <div className="w-full flex flex-col h-[calc(100vh-66px)]">
      <div className="grid grid-col-1 grow md:grid-cols-[1fr_500px] border-b dark:border-default-50">
        <PlanQnAForm />
        <div className="border-l dark:border-default-50 relative">
          <FlowProvider>
            <PlanBlocks
              initialNodes={[
                {
                  id: '1',
                  type: 'noteNode',
                  data: {
                    title: 'Usage',
                    description:
                      'You can drag and drop tech items to here and build your project stack'
                  },
                  position: { x: -100, y: -300 },
                  selected: false
                },
                {
                  id: '2',
                  type: 'labelNode',
                  data: {
                    label: projectName.value
                  },
                  position: { x: 0, y: 0 },
                  selected: false
                }
              ]}
              initialEdges={[]}
            />
          </FlowProvider>
        </div>
      </div>
    </div>
  )
}
