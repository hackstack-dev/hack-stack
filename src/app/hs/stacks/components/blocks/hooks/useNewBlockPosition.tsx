import { useStoreApi } from 'reactflow'

export default function useNewBlockPosition() {
  const store = useStoreApi()

  function setPosition() {
    const { nodeInternals } = store.getState()
    const nodes = Array.from(nodeInternals).map(([, node]) => node)
    if (nodes.length) {
      const lastNode = nodes.at(-1)
      const lastNodePosition = lastNode?.position ?? { x: 0, y: 0 }
      const lastNodeWidth = lastNode?.width ?? 0
      const lastNodeHeight = lastNode?.height ?? 0

      // random left or right
      const x =
        nodes.length % 2
          ? lastNodePosition.x + lastNodeWidth
          : lastNodePosition.x - lastNodeWidth
      const y = lastNodePosition.y + lastNodeHeight + 50
      return { x, y }
    }
    return { x: 0, y: 0 }
  }

  return { setPosition }
}
