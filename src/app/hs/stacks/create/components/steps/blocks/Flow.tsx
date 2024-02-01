'use client'

import { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  BackgroundVariant
} from 'reactflow'

import 'reactflow/dist/style.css'
import { useTheme } from 'next-themes'

export default function Flow({
  nodes: initNodes,
  edges: initEdges
}: {
  nodes: Node[]
  edges: Edge[]
}) {
  const [nodes, setNodes] = useState<Node[]>(initNodes)
  const [edges, setEdges] = useState<Edge[]>(initEdges)
  const { theme } = useTheme()
  const backgroundColor = theme === 'light' ? '#1f2937' : '#EFCE4A'

  const onNodesChange: OnNodesChange = useCallback((chs) => {
    setNodes((nds) => applyNodeChanges(chs, nds))
  }, [])

  const onEdgesChange: OnEdgesChange = useCallback((chs) => {
    setEdges((eds) => applyEdgeChanges(chs, eds))
  }, [])

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      className="stack-blocks"
      proOptions={{ hideAttribution: true }}
      fitViewOptions={{ maxZoom: 1 }}
      fitView
    >
      <Background color={backgroundColor} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
