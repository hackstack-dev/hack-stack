import React from 'react'
import { getNodesBounds, useReactFlow, useStoreApi } from 'reactflow'

export default function useSetCenter() {
  const store = useStoreApi()
  const { setCenter, fitView } = useReactFlow()

  React.useEffect(() => {
    const { nodeInternals } = store.getState()
    const nodes = Array.from(nodeInternals).map(([, node]) => node)
    if (nodes.length) {
      const bounds = getNodesBounds(nodes)
      const x = bounds.x - bounds.x
      const y = bounds.y + bounds.height / 2
      setTimeout(() => setCenter(x, y, { zoom: 1, duration: 700 }))
      requestAnimationFrame(() => fitView())
    }
  }, [store, setCenter, fitView])
}
