'use client'

import {
  Edge,
  Node,
  ReactFlowProvider
} from 'reactflow'
import Flow from '@/app/hs/plan/components/Flow'

interface PlanProviderProps {
  nodes: Node[]
  edges: Edge[]
}
export default function PlanProvider({ nodes, edges }: PlanProviderProps) {
  return (
    <ReactFlowProvider initialNodes={nodes} initialEdges={edges}>
      <section className="h-screen w-full">
        <Flow nodes={nodes} edges={edges} />
      </section>
    </ReactFlowProvider>
  )
}
