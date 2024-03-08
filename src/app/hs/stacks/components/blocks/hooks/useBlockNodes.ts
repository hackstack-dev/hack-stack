import { useReactFlow } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import React from 'react'

export default function useBlockNodes() {
  const { getNodes, getEdges } = useReactFlow<BlockNodeData>()
  const [error, setError] = React.useState('')
  const validateBlocks = () => {
    setError('')
    const nodes = getNodes()
    if (!nodes.length) {
      setError('No blocks added')
      return Promise.reject('No blocks added')
    }
    if (
      nodes?.some((node) => node.type === 'blockNode' && !node.data?.tech?.name)
    ) {
      setError('Some blocks are missing tech')
      return Promise.reject('Some blocks are missing tech')
    }
    const groupNodes = nodes.filter(
      (node) => node.type === 'resizeableGroupNode'
    )
    if (groupNodes.length) {
      // all groupNodesIds should have at least on node with parent id as groupNodeIds
      const groupNodesWithBlocks = groupNodes.filter((groupNode) => {
        return nodes.some((node) => {
          return node.parentNode === groupNode.id
        })
      })
      if (groupNodesWithBlocks.length !== groupNodes.length) {
        setError('Some groups have no blocks')
        return Promise.reject('Some groups have no blocks')
      }
    }
  }

  return { validateBlocks, error, getNodes, getEdges }
}
