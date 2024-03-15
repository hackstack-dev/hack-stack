import type { Node } from 'reactflow'
export const groupsFirst = (nodeA: Node, nodeB: Node) =>
  nodeA.type === nodeB.type
    ? 0
    : nodeA.type === 'resizeableGroupNode' &&
        nodeB.type !== 'resizeableGroupNode'
      ? -1
      : 1

export const adjustNodePositionInGroup = (node: Node, groupNode: Node) => {
  const nodePosition = node.position ?? { x: 0, y: 0 }
  const nodeWidth = node.width ?? 0
  const nodeHeight = node.height ?? 0
  const groupWidth = groupNode.width ?? 0
  const groupHeight = groupNode.height ?? 0

  if (nodePosition.x < groupNode.position.x) {
    nodePosition.x = 0
  } else if (nodePosition.x + nodeWidth > groupNode.position.x + groupWidth) {
    nodePosition.x = groupWidth - nodeWidth
  } else {
    nodePosition.x = nodePosition.x - groupNode.position.x
  }

  if (nodePosition.y < groupNode.position.y) {
    nodePosition.y = 0
  } else if (nodePosition.y + nodeHeight > groupNode.position.y + groupHeight) {
    nodePosition.y = groupHeight - nodeHeight
  } else {
    nodePosition.y = nodePosition.y - groupNode.position.y
  }

  return nodePosition
}
