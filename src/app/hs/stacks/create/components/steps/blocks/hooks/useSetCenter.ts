import React from 'react'
import { getNodesBounds, useReactFlow, useStoreApi } from 'reactflow'

export default function useSetCenter() {
  const store = useStoreApi()
  const { setCenter } = useReactFlow()

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
}
