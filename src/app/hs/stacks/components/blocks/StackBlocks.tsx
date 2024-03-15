import React, { type MouseEvent as ReactMouseEvent } from 'react'
import {
  addEdge,
  type Connection,
  type ConnectionLineType,
  type Edge,
  type Node,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useUpdateNodeInternals
} from 'reactflow'
import { NewBlockDialog } from '@/app/hs/stacks/components/blocks/library/NewBlockDialog'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ResizeHandle from '@/app/hs/stacks/components/blocks/ResizeHandle'

import { cn } from '@/app/lib/utils'
import { useSnapshot } from 'valtio'

import StackBlocksDataPanel from '@/app/hs/stacks/components/blocks/StackBlocksDataPanel'
import AddGroupButton from '@/app/hs/stacks/components/blocks/AddGroupButton'
import BlocksToolbar from '@/app/hs/components/ui/FlowEditor/BlocksToolbar'
import {
  connectionsLineType,
  enableConnectionAnimation,
  snapToGridEnabled
} from '@/app/hs/stacks/components/blocks/Blocks.state'

import type {
  BlockNodeData,
  GroupNodeData
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import useNewBlockPosition from '@/app/hs/components/ui/FlowEditor/hooks/useNewBlockPosition'
import {
  adjustNodePositionInGroup,
  groupsFirst
} from '@/app/hs/components/ui/FlowEditor/helpers/StackBlocks.utils'
import Flow from '@/app/hs/components/ui/FlowEditor/Flow'

interface StackBlocksProps {
  initialNodes: Node<BlockNodeData | GroupNodeData, string | undefined>[]
  initialEdges?: Edge[]
  hidden?: boolean
}
export default function StackBlocks({
  initialNodes,
  initialEdges = [],
  hidden = false
}: StackBlocksProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { getIntersectingNodes, screenToFlowPosition } = useReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()
  const { setPosition } = useNewBlockPosition()
  const snapToGrid = useSnapshot(snapToGridEnabled)
  const lineType = useSnapshot(connectionsLineType)
  const animated = useSnapshot(enableConnectionAnimation)

  const onEdgeConnect = React.useCallback(
    (connection: Connection) =>
      setEdges((eds) => {
        return addEdge(
          {
            ...connection,
            style: { stroke: '#8b5cf6' },
            type: lineType.value,
            animated: animated.value
          },
          eds
        )
      }),
    [setEdges, lineType.value, animated.value]
  )
  const handleAddBlock = (nodeData: BlockNodeData) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((node) =>
        node.selected ? { ...node, selected: false } : node
      )

      const newBlockNode = {
        id: `${nodeData.id}_${updatedNodes.length}`,
        type: 'blockNode',
        data: nodeData,
        position: setPosition(),
        selected: true
      }

      return [...updatedNodes, newBlockNode].sort(groupsFirst)
    })
  }

  const handleAddGroup = () => {
    const id = `group-${nodes.length + 1}`
    const groupNode: Node<GroupNodeData> = {
      id,
      type: 'resizeableGroupNode',
      data: { blockName: 'Name your group', id },
      position: setPosition(),
      style: {
        width: 250,
        height: 250
      }
    }

    setNodes((nodes) => [groupNode, ...nodes].sort(groupsFirst))
  }

  const handleUpdateBlock = React.useCallback(
    (nodeId: Node['id'], blockSelectedTech: BlockNodeData['tech']) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            return { ...node, data: { ...node.data, tech: blockSelectedTech } }
          }
          return node
        })
      )
    },
    [setNodes]
  )

  const handleUpdateGroup = React.useCallback(
    (nodeId: Node['id'], name: GroupNodeData['blockName']) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, blockName: name } }
          }
          return node
        })
      )
    },
    [setNodes]
  )

  const handleDetachGroupNode = React.useCallback(
    (nodeId: Node['id']) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, parentNode: undefined }
          }
          return node
        })
      )
    },
    [setNodes]
  )

  const handleNodeDrag = React.useCallback(
    (event: ReactMouseEvent, node: Node) => {
      if (node.type !== 'blockNode' && !node.parentNode) return

      const groupNodes = getIntersectingNodes(node).filter(
        (n) => n.type === 'resizeableGroupNode'
      )
      const hasGroupChildren = groupNodes.length > 0
      const firstGroupNode = groupNodes[0]
      const isDifferentParent = node.parentNode !== firstGroupNode?.id

      setNodes((nds) =>
        nds.map((n) =>
          n.type === 'resizeableGroupNode'
            ? {
                ...n,
                className:
                  hasGroupChildren && isDifferentParent
                    ? 'ring ring-3 ring-primary'
                    : ''
              }
            : n.id === node.id
              ? { ...n, position: node.position }
              : n
        )
      )
    },
    [getIntersectingNodes, setNodes]
  )

  const handleNodeDragStop = React.useCallback(
    (event: ReactMouseEvent, draggedNode: Node) => {
      if (draggedNode.type !== 'blockNode' && !draggedNode.parentNode) return

      const intersectingGroupNodes = getIntersectingNodes(draggedNode).filter(
        (node) => node.type === 'resizeableGroupNode'
      )

      const firstGroupNode = intersectingGroupNodes[0]

      if (firstGroupNode && draggedNode.parentNode !== firstGroupNode?.id) {
        setNodes((nodes) =>
          nodes
            .map((node) => {
              if (node.id === firstGroupNode.id) {
                return {
                  ...node,
                  className: ''
                }
              }

              if (node.id === draggedNode.id) {
                const adjustedPosition = adjustNodePositionInGroup(
                  node,
                  firstGroupNode
                ) ?? { x: 0, y: 0 }

                return {
                  ...node,
                  position: adjustedPosition,
                  parentNode: firstGroupNode.id,
                  extent: 'parent' as const
                }
              }

              return node
            })
            .sort(groupsFirst)
        )
      }
    },
    [getIntersectingNodes, setNodes]
  )

  const onDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      try {
        const nodeDataString = event.dataTransfer.getData(
          'application/reactflow'
        )
        const nodeData = JSON.parse(nodeDataString) as BlockNodeData

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY
        })

        setNodes((nds) => {
          const updatedNodes = nds.map((node) =>
            node.selected ? { ...node, selected: false } : node
          )

          const newBlockNode = {
            id: `${nodeData.id}_${updatedNodes.length}`,
            type: 'blockNode',
            data: nodeData,
            position,
            selected: true
          }

          return [...updatedNodes, newBlockNode].sort(groupsFirst)
        })
      } catch (error) {
        console.error(error)
      }
    },
    [screenToFlowPosition, setNodes]
  )

  const handleUpdateNodeInternals = React.useCallback(() => {
    updateNodeInternals(nodes.map((n) => n.id))
  }, [updateNodeInternals, nodes])

  const handleLineTypeChange = React.useCallback(
    (type: ConnectionLineType) => {
      setEdges((nds) => nds.map((edge) => ({ ...edge, type })))
    },
    [setEdges]
  )

  const handleAnimatedChange = React.useCallback(
    (animated: boolean) => {
      setEdges((nds) => nds.map((edge) => ({ ...edge, animated })))
    },
    [setEdges]
  )

  return (
    <div
      className={cn(
        'grow border-1 rounded dark:border-default-50',
        hidden && 'hidden'
      )}
    >
      <PanelGroup direction="horizontal">
        <Panel minSize={70}>
          <section className="h-full w-full relative">
            <NewBlockDialog onAddBlock={handleAddBlock} />
            <AddGroupButton handleAddGroup={handleAddGroup} />
            <Flow
              nodes={nodes}
              edges={edges}
              onEdgeConnect={onEdgeConnect}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeDrag={handleNodeDrag}
              onNodeDragStop={handleNodeDragStop}
              onDrop={(event) => onDrop(event)}
              onDragOver={onDragOver}
              snapToGrid={snapToGrid.value}
            />
            <BlocksToolbar
              publishConnectionsConfigChange={handleUpdateNodeInternals}
              onLineTypeChange={handleLineTypeChange}
              onAnimatedChange={handleAnimatedChange}
            />
          </section>
        </Panel>
        <PanelResizeHandle className="relative">
          <ResizeHandle />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={0}>
          <StackBlocksDataPanel
            onUpdateBlock={handleUpdateBlock}
            onUpdateGroup={handleUpdateGroup}
            onDetachBlock={handleDetachGroupNode}
            nodes={nodes}
          />
        </Panel>
      </PanelGroup>
    </div>
  )
}
