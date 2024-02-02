import React from 'react'
import ReactFlow, {
  Node,
  OnNodesChange,
  Background,
  BackgroundVariant,
  useStoreApi,
  useReactFlow,
  getNodesBounds,
  useNodesState
} from 'reactflow'

import 'reactflow/dist/style.css'
import { useTheme } from 'next-themes'
import BlockNode from '@/app/hs/stacks/create/components/steps/blocks/BlockNode'

const nodeTypes = {
  blockNode: BlockNode
}

interface FlowProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  onNodesChange: OnNodesChange
}
export default function Flow({ nodes, onNodesChange }: FlowProps) {
  const store = useStoreApi()
  const { setCenter } = useReactFlow()

  const { theme } = useTheme()
  const backgroundColor = theme === 'light' ? '#1f2937' : '#EFCE4A'

  React.useEffect(() => {
    const { nodeInternals } = store.getState()
    const nodes = Array.from(nodeInternals).map(([, node]) => node)
    if (nodes.length) {
      const bounds = getNodesBounds(nodes)
      const x = bounds.x - bounds.width / 2
      const y = bounds.y + bounds.height / 2
      setCenter(x, y, { zoom: 0.8, duration: 1000 })
    }
  }, [store, setCenter])

  return (
    <ReactFlow
      nodes={nodes}
      edges={[]}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      proOptions={{ hideAttribution: true }}
      fitViewOptions={{ maxZoom: 1 }}
      fitView
    >
      <Background color={backgroundColor} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
