import { useReactFlow } from 'reactflow'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import React from 'react'

export default function useBlockNodes() {
  const { getNodes } = useReactFlow<BlockNodeData>()
  const [error, setError] = React.useState('')
  const validateBlocks = () => {
    setError('')
    const nodes = getNodes()
    if (!nodes.length) {
      setError('No blocks added')
      return Promise.reject('No blocks added')
    }
    if (nodes?.some((node) => !node.data?.tech?.name)) {
      setError('Some blocks are missing tech')
      return Promise.reject('Some blocks are missing tech')
    }
  }

  return { validateBlocks, error, getNodes }
}
