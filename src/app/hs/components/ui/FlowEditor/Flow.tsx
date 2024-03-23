import React, { type DragEventHandler } from 'react'
import ReactFlow, {
  type Node,
  type OnNodesChange,
  type OnConnect,
  Background,
  BackgroundVariant,
  type BackgroundProps,
  type NodeChange,
  type NodeDragHandler,
  type Edge,
  type OnEdgesChange,
  type EdgeChange
} from 'reactflow'

import 'reactflow/dist/style.css'
import { useTheme } from 'next-themes'
import BlockNode from '@/app/hs/components/ui/FlowEditor/node-types/BlockNode'
import CustomBlockNode from '@/app/hs/components/ui/FlowEditor/node-types/CustomBlockNode'
import StackDetailsNode from '@/app/hs/components/ui/FlowEditor/node-types/StackDetailsNode'
import ResizableGroupNode from '@/app/hs/components/ui/FlowEditor/node-types/ResizableGroupNode'
import CustomGroupNode from '@/app/hs/components/ui/FlowEditor/node-types/CustomGroupNode'
import CustomEdge from '@/app/hs/components/ui/FlowEditor/edge-types/CustomEdge'
import useSetCenter from '@/app/hs/components/ui/FlowEditor/hooks/useSetCenter'


const nodeTypes = {
  blockNode: BlockNode,
  customBlockNode: CustomBlockNode,
  stackDetailsNode: StackDetailsNode,
  resizeableGroupNode: ResizableGroupNode,
  customGroupNode: CustomGroupNode,
}

const edgeTypes = {
  customEdge: CustomEdge
}

interface FlowProps<T> {
  nodes: Node[]
  edges: Edge[]
  onEdgeConnect?: OnConnect
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onNodeDrag?: NodeDragHandler
  onNodeDragStop?: NodeDragHandler
  onDrop?: DragEventHandler
  onDragOver?: DragEventHandler
  viewOnly?: boolean
  snapToGrid?: boolean
  background?: BackgroundProps
}
export default function Flow<T = Element>({
  nodes,
  edges,
  onEdgeConnect,
  onNodesChange,
  onEdgesChange,
  onNodeDrag,
  onNodeDragStop,
  onDrop,
  onDragOver,
  viewOnly = false,
  snapToGrid = false,
  background
}: FlowProps<T>) {
  const { theme } = useTheme()

  const bgProps = React.useMemo(
    () =>
      background
        ? background
        : {
            color: theme === 'light' ? '#1f2937' : '#8b5cf6',
            variant: BackgroundVariant.Dots
          },
    [background, theme]
  )

  useSetCenter()

  const handleNodesChange = (changes: NodeChange[]) => {
    if (viewOnly && changes.some((c) => c.type === 'remove')) return
    onNodesChange(changes)
  }

  const handleEdgesChange = (changes: EdgeChange[]) => {
    if (viewOnly && changes.some((c) => c.type === 'remove')) return
    onEdgesChange(changes)
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={onEdgeConnect}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onDrop={onDrop}
      onDragOver={onDragOver}
      selectNodesOnDrag={false}
      proOptions={{
        hideAttribution: true
      }}
      fitViewOptions={{ maxZoom: 1 }}
      snapToGrid={snapToGrid}
      fitView
    >
      <Background {...bgProps} />
    </ReactFlow>
  )
}
